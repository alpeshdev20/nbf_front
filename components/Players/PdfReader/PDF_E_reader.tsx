import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import { Button, DocumentLoadEvent, Icon, PdfJs, Position, PrimaryButton, RenderPageProps, Tooltip, Viewer, Worker } from '@react-pdf-viewer/core';
import { BookmarkIcon, defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import type { SetRenderRange, VisiblePagesRange } from '@react-pdf-viewer/core';
import {
    HighlightArea,
    highlightPlugin,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightTargetProps,
    RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';

import type { ToolbarProps, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import { SearchIcon, searchPlugin } from '@react-pdf-viewer/search';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { useSession } from "@/providers/SessionProvider";
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

//styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import './PdfReader.module.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import axios from 'axios';
import SearchSidebar from './SearchSidebar';
import { FaBookmark } from 'react-icons/fa';
import './styles.css';

interface Note {
    id: any;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

interface HighlightExampleProps {
    fileUrl: string;
    // userId :string | unknown;
    book_id: string | unknown
    resource: string;
    resourceId: string;
    updateUserReadingStats: (pageNumber: string) => void;
    updateUserAndBookStats: (time: string) => void;
}

interface Bookmark {
    pageIndex: any;
    snippet: string;
}
interface CustomRenderPageProps extends RenderPageProps {
    snippet?: string;  // Add `snippet` as an optional property
}

const PDF_E_reader: React.FC<HighlightExampleProps> = ({ fileUrl,

    book_id, resource, updateUserReadingStats, resourceId, updateUserAndBookStats }) => {
    // Prevent copy event (Ctrl+C)
    const handleCopyEvent = (event: ClipboardEvent) => {
        event.preventDefault(); // This will stop the text from being copied
    };

    // Set up event listener to block the default copy action (Ctrl + C)
    React.useEffect(() => {
        // Listen for the copy event and prevent the default behavior (copying)
        document.addEventListener('copy', handleCopyEvent);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener('copy', handleCopyEvent);
        };
    }, []);

    //* Use Effect for setInterval
    useEffect(() => {
        const interval = setInterval(() => {
            updateUserAndBookStats("5000");
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    const { session } = useSession();
    const userIdMain = session?.user?.user_id;

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    const notesContainerRef = React.useRef<HTMLDivElement | null>(null);
    let noteId = notes.length;
    const noteEles: Map<number, HTMLElement> = new Map();
    const BookmarkEles: Map<number, HTMLElement> = new Map();
    const [preloadedPages, setPreloadedPages] = useState([]);

    const handleDocumentLoad = (e: DocumentLoadEvent) => {
        setCurrentDoc(e.doc);
    };

    type ITextSelection = {
        text: string
      }
    
    type ITheme = 'light' | 'dark'
    
    // Bookmark 
    const [bookmarkedPages, setBookmarkedPages] = React.useState<Bookmark[]>([]);
    const bookmarkContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(null);
    const viewerRef = React.useRef<HTMLDivElement | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const hasFetchedBookmarks = useRef(false); // Track if fetchBookmarks has been called
    const [pageIndexB, setPageIndexB] = useState<number>(0)
    const [theme, setTheme] = useState<ITheme>('light'); //Theme
    const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // Timer
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [time, setTime] = useState(20 * 60); // Initial time in seconds (20 minutes)
    const [isRunning, setIsRunning] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false); // To show the "Time Up" notification

    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    // Text to Voice 
    const [showTextToSpeeshPopup, TextToSpeeshPopup] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null); // Updated type
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [selectedTextPdf, setSelectedText] = useState<ITextSelection | null>(null)
    
    // Open text to speech modal &&  Button click handler
    const handleTextToSpeech = (props: any) => {
        console.log("selectes text is " , props.selectedText);
        
        setSelectedText({
            text: props.selectedText,
        });
        console.log("selectedTextPdf text is " , selectedTextPdf);

        TextToSpeeshPopup(true);
    };
    //  pronounce selected text
    const handlePlay = () => {
        console.log("handleTextToSpeech called with selected text:" ,selectedTextPdf?.text);


    if (!selectedTextPdf || !selectedTextPdf.text) {
        console.log("Text is not selected");
        return;
    }   
    if (selectedTextPdf) {
            console.log("in side if goes");
            
            const synth = window.speechSynthesis;
            // const textChunks = selectedText.text.split(/(\n|\.)/).filter(Boolean); // Split by new lines or periods
            // const textChunks = selectedText.text.split(/(\n|\.)/).filter(Boolean);
              const textChunks = selectedTextPdf?.text.split(/(\n|\.)/).filter(Boolean);

            const utterances: SpeechSynthesisUtterance[] = [];

            textChunks.forEach((chunk : any) => {
                const u = new SpeechSynthesisUtterance(chunk.trim());
                console.log("u text chunks" ,u);
                
                u.pitch = pitch;
                u.rate = rate;
                u.volume = volume;
                if (voice) u.voice = voice;

                utterances.push(u);
            });

            // Chain utterances to speak sequentially
            for (let i = 0; i < utterances.length - 1; i++) {
                utterances[i].onend = () => synth.speak(utterances[i + 1]);
            }

            // Speak first utterance
            if (utterances.length > 0) {
                synth.speak(utterances[0]);
            }

            setUtterance(utterances[0]); // Store first utterance reference
        }
        else{
            console.log("text is not selected ");
            
        }
    };
    // speakText(selectedText?.text || '');
    const handlePause = () => {
        const synth = window.speechSynthesis;

        synth.pause();

        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();

        setIsPaused(false);
    };
    //Voice Change
    const handleVoiceChange = (event: any) => {
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find((v) => v.name === event.target.value) || null; // Ensure null fallback
        setVoice(selectedVoice);
    };

    //Pithch Change
    const handlePitchChange = (event: any) => {
        setPitch(parseFloat(event.target.value));
    };
    //Rate change
    const handleRateChange = (event: any) => {
        setRate(parseFloat(event.target.value));
    };
    //Volume Change
    const handleVolumeChange = (event: any) => {
        setVolume(parseFloat(event.target.value));
    };
    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleAddTime = (seconds: any) => {
        setTime((prevTime) => Math.max(prevTime + seconds, 0)); // Prevent negative time
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (time === 0 && isRunning) {
            setIsRunning(false); // Stop the timer
            setIsTimeUp(true); // Show the "Time Up" notification
        }

        return () => clearInterval(timer);
    }, [isRunning, time]);

    const closeNotification = () => {
        setIsTimeUp(false);
      };
    // Function to add a bookmark
    const addBookmark =  async (pageIndex: number) => {
            try {
                // Use PDF.js to get the text content of the page
               console.log("before snipped");
               
                const snippet= await extractSnippet(pageIndex);
                console.log("snippet",snippet);
                
                const response = await axios.post(`${process.env.API_URL}bookmarks/add`, {
                    book_id,
                    userIdMain,
                    pageIndex,
                    snippet
                });

                // Add the bookmark with page number and snippet
                setBookmarkedPages([
                    ...bookmarkedPages,
                    { pageIndex, snippet },
                ]);
                
               console.log("bookmaek  added successfully");
                                
            } catch (error) {
                console.error("Error extracting text content from the page:", error);
            }
        // }
        // if (!bookmarkedPages.includes(pageIndex)) {
        //     setBookmarkedPages([...bookmarkedPages, pageIndex]);
        // }
    };
    // 
        // Function to extract first 3-4 sentences or first 100 characters
        const extractSnippet = async (pageIndex: number) => {
            try {

                if (!currentDoc) {
                    console.error("currentDoc is null");
                    return ''; // Return empty snippet if currentDoc is null
                }
                // Use PDF.js to get the text content of the page
                const page = await currentDoc.getPage(pageIndex + 1); // PDF.js pages are 1-based
                const textContent = await page.getTextContent();
                
                // Get the page dimensions to understand the layout
                const viewport = page.getViewport({ scale: 1 });
                const pageHeight = viewport.height;
        
                // Filter the text items to exclude header and footer based on Y-coordinates
                const bodyTextItems = textContent.items.filter((item) => {
                    const yCoord = (item as any).transform[5]; // Use 'any' to bypass type checking
                    return yCoord > pageHeight * 0.1 && yCoord < pageHeight * 0.9;
                });
        
                // Join the filtered text items to form the body text
                const textItems = bodyTextItems.map((item) => item.str).join(' ');
        
                // Function to split text into sentences based on punctuation
                const sentences = textItems.split(/(?<=\.)\s+/); // Split text by period (.) followed by space
        
                // Get the first 3-4 sentences or first 100 characters
                let snippet = sentences.slice(0, 3).join(' '); // Join first 3 sentences (can change to 4 sentences)
        
                // If we don't have enough sentences, fall back to the first 100 characters
                if (snippet.length < 100) {
                    snippet = textItems.substring(0, 100);
                }
            
                return snippet; // Return the snippet (first 3-4 sentences or first 100 characters)
            } catch (error) {
                console.error("Error extracting snippet:", error);
                return ''; // Return empty string in case of error
            }
        };
        

     // ftech Bookmark
       const fetchBookmarks = async () => {
        try {
            const response = await axios.post(`${process.env.API_URL}bookmarks/list`, {
                book_id,
                userIdMain,
            });
    
            // Assuming 'message' contains the bookmarks
            const bookmarksArray1 = response.data.message;  // Correctly access the 'message' property
    
            // If 'bookmarksArray1' is valid, proceed with further processing
            if (Array.isArray(bookmarksArray1)) {
    
                if (Array.isArray(bookmarksArray1)) {
                    // Accumulate the new bookmarks in an array
                    const fetchedBookmarks = bookmarksArray1.map((bookmark: any) => ({
                        pageIndex: bookmark.page_number,  // Ensure `page_number` exists in the response
                        snippet: bookmark.bookmark_content,  // Ensure `bookmark_content` exists in the response
                    }));
        
                    // Update the state with all the fetched bookmarks at once
                    setBookmarkedPages((prevBookmarkedPages) => [
                        ...prevBookmarkedPages,  // Retain previous bookmarks
                        ...fetchedBookmarks,     // Add newly fetched bookmarks
                    ]);
                    
                } else {
                    console.error("Expected an array but got:", bookmarksArray1);
                }
                
    
            } else {
                console.error("Expected an array but got:", bookmarksArray1);
            }
    
        } catch (error) {
            console.error("Failed to fetch bookmarks:", error);
        }
    };


    React.useEffect(() => {
        if (!hasFetchedBookmarks.current) {
            fetchBookmarks(); // Fetch bookmarks only once
            hasFetchedBookmarks.current = true; // Mark that fetchBookmarks has been called
        }
    }, []);

    useEffect(() => {
        if (viewerRef.current && currentDoc) {
            const viewerInstance = viewerRef.current.querySelector('.rpv-core__viewer');
            
            if (viewerInstance) {
                // Ensure the document is loaded and all pages are available
                const totalPages = currentDoc.numPages; // This directly fetches the total number of pages
                console.log("Total Pages:", totalPages);
            }
        }
    }, [viewerRef, currentDoc]);


    const bookmark = (
        <>
            <div
                ref={bookmarkContainerRef}
                style={{
                    overflow: 'auto',
                    width: '100%',
                }}
            >
                {bookmarkedPages?.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>No bookmarks yet.</div>
                ) : (
                    bookmarkedPages.map((bookmark) => (
                        <div
                            key={bookmark.pageIndex}  // Use bookmark.pageIndex if it's unique
                            style={{
                                marginTop: '10px',
                                marginLeft: '10px',
                                marginRight: '10px',
                                borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                cursor: 'pointer',
                                padding: '8px',
                            }}
                        >
                            {/* Ensure that pageIndex is valid before rendering the button */}
                            {bookmark.pageIndex != null ? (
                                <div>
                                    <button
                                        onClick={() => {
                                            // Uncomment the following lines if needed
                                            // scrollToPage(bookmark.pageIndex);
                                            // setPageIndexB(bookmark.pageIndex);
                                            scrollToPage(bookmark.snippet, bookmark.pageIndex);
                                        }}
                                        style={{
                                            borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                            fontSize: '.75rem',
                                            lineHeight: 1.5,
                                            margin: '0 0 8px 0',
                                            paddingLeft: '8px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        <FaBookmark style={{ cursor: 'pointer', color: 'blue' }} />
                                        &nbsp;
                                        {bookmark.snippet}...
                                    </button>
                                </div>
                            ) : (
                                <div style={{ color: 'red' }}>Invalid bookmark, missing pageIndex</div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
    
    
    //scrooll to page where
    const scrollToPage = (snippet: string ,pageIndex : number) => {
        
        //close sidebar
        const sidebarContainer = document.querySelector('.rpv-default-layout__sidebar--ltr');
        const sidebarContent = document.querySelector('.rpv-default-layout__sidebar-content--ltr');

        if (sidebarContainer && sidebarContent) {
            console.log("class of sidebar", sidebarContainer, sidebarContent);
            sidebarContainer.classList.remove("rpv-default-layout__sidebar--opened")
            sidebarContent.classList.remove("rpv-default-layout__sidebar-content--opened")
        }
    
    if (viewerRef.current) {
        const viewerInstance = viewerRef.current.querySelector('.rpv-core__viewer') as HTMLElement;
        console.log('viewerInstance', viewerInstance);

        if (viewerInstance) {
            // Ensure that the viewer has rendered enough pages before accessing them
            let renderedPages = viewerInstance.querySelectorAll('.rpv-core__page-layer').length;
            console.log("Rendered Pages: ", renderedPages);
            

            // Ensure page is fully rendered and scrolled
            const pages = viewerInstance.querySelectorAll('.rpv-core__page-layer');            
            const pageElement = pages[pageIndex];

            if (pageElement) {

                // Scroll the page into view when the snippet is found
                pageElement.scrollIntoView({
                    behavior: 'auto',
                    block: 'start',
                });

                return pageIndex; // Return the page index once the snippet is found
            } else {
                console.log('Page element not found');
                return -1; // Return -1 if the page element is not found
            }
        }
    }
    };
      
    //set current page
    const handlePageChange = (e: { currentPage: number }) => {
        setCurrentPage(e.currentPage);
    };
    // Function to list bookmarks

    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
        ...slot,
        Search:()=> <></>,
        SearchMenuItem :()=><></>,
        Download: () => <></>,
        DownloadMenuItem: () => <></>,
        // EnterFullScreen: () => <></>,
        Print: () => <></>, // Add this to remove the Print button
        PrintMenuItem: () => <></>, // Add this to remove the Print menu item (if exists)
        UploadFile: () => <></>, // Remove the Upload File button
        UploadFileMenuItem: () => <></>, // Remove the Upload File menu item (if exists)    
        // EnterFullScreenMenuItem: () => <></>,
        // SwitchTheme: () => <></>,
        // SwitchThemeMenuItem: () => <></>,
        OpenFile: () => <></>, // Disable the Open File button
        OpenFileMenuItem: () => <></>, // Disable the Open File menu item (if exists)
        Open:() =><></>,
        OpenMenuItem:()=><></>
       
    });
    
    //rendertoolbar
    const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    );
    // Add highlight and note content
    const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
                zIndex: 1,
            }}
        >
            {/* Add note Button */}
            <Tooltip
                position={Position.TopCenter}
                target={
                    <button className='cust-ereader-pdf-popup-btn-icon' onClick={props.toggle}>
                        <MessageIcon />
                    </button>
                }
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
            {/* Text to Voice Icon */}
            <Tooltip
                position={Position.TopCenter}
                target={
                    <button  className='cust-ereader-pdf-popup-btn-icon' onClick={()=> handleTextToSpeech(props)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 22q-.825 0-1.412-.587T2 20V4q0-.825.588-1.412T4 2h6q.425 0 .713.288T11 3t-.288.713T10 4H4v16h11v-1q0-.425.288-.712T16 18t.713.288T17 19v1q0 .825-.587 1.413T15 22zm3-4q-.425 0-.712-.288T6 17t.288-.712T7 16h5q.425 0 .713.288T13 17t-.288.713T12 18zm0-3q-.425 0-.712-.288T6 14t.288-.712T7 13h3q.425 0 .713.288T11 14t-.288.713T10 15zm2.5-4q-.625 0-1.062-.437T8 9.5v-2q0-.625.438-1.062T9.5 6H11l2.3-2.3q.125-.125.313-.213T14 3.4q.425 0 .713.3t.287.725v8.15q0 .425-.288.725t-.712.3q-.2 0-.387-.087T13.3 13.3L11 11zM19 8.5q0 .825-.325 1.575T17.75 11.4q-.2.2-.475.075t-.275-.45v-5.05q0-.3.275-.437t.475.062q.6.575.925 1.325T19 8.5m2 0q0-1.65-.837-3.05t-2.288-2.2q-.375-.2-.525-.587t0-.763q.15-.4.538-.562t.737.037q2.025 1.05 3.2 2.95T23 8.5t-1.175 4.175t-3.2 2.95q-.35.2-.737.038t-.538-.563q-.15-.375 0-.762t.525-.588q1.45-.8 2.288-2.2T21 8.5"/></svg>
                    </button>
                }
                content={() => <div style={{ width: '100px' }}>Text To Voixce</div>}
                offset={{ left: 0, top: -8 }}
            />
            {/* Dictionary Button*/}
            <Tooltip
                position={Position.TopCenter}
                target={
                    <Tooltip
                    position={Position.TopCenter}
                    target={
                        <button  
                            className='cust-ereader-pdf-popup-btn-icon' 
                            onClick={() => window.open('https://www.oxfordlearnersdictionaries.com/', '_blank')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4.385 14.09h.779l.555-1.534h2.87l.561 1.535h.792l-2.31-6.143h-.957zm1.62-2.267l1.124-3.06h.05l1.123 3.06zm7.88-2.23v-.931q.805-.408 1.725-.612t1.89-.204q.554 0 1.064.071q.509.072 1.052.202v.908q-.524-.167-1.02-.232q-.498-.064-1.096-.064q-.97 0-1.892.218q-.924.218-1.724.643m0 5.462v-.97q.768-.407 1.717-.611t1.899-.204q.554 0 1.064.072q.509.07 1.052.201v.908q-.524-.167-1.02-.232q-.498-.064-1.096-.064q-.97 0-1.892.235q-.924.234-1.724.665m0-2.712v-.969q.806-.408 1.726-.611t1.89-.204q.554 0 1.063.07q.51.072 1.052.203v.908q-.523-.168-1.02-.232q-.497-.065-1.095-.065q-.97 0-1.892.238q-.924.237-1.724.662M6.5 16.038q1.31 0 2.547.301t2.453.98V7.508q-1.083-.773-2.386-1.16q-1.305-.386-2.614-.386q-.9 0-1.576.107t-1.501.4q-.23.077-.327.222Q3 6.835 3 7.008v9.015q0 .27.192.394t.423.03q.548-.185 1.267-.297t1.618-.111m6 1.28q1.216-.678 2.453-.98t2.547-.3q.9 0 1.618.111t1.267.296q.23.096.423-.029t.192-.394V7.008q0-.173-.096-.308q-.096-.134-.327-.23q-.825-.293-1.501-.4T17.5 5.961q-1.31 0-2.613.386q-1.304.387-2.387 1.16zm-.5 1.45q-1.22-.834-2.62-1.282t-2.88-.448q-.78 0-1.534.13q-.753.131-1.466.42q-.544.217-1.022-.131T2 16.496V6.831q0-.371.195-.689t.547-.442q.881-.388 1.833-.563T6.5 4.962q1.47 0 2.866.423q1.398.423 2.634 1.23q1.237-.807 2.634-1.23t2.866-.423q.973 0 1.925.175t1.833.563q.352.125.547.442t.195.689v9.665q0 .614-.516.943q-.517.328-1.1.111q-.693-.27-1.418-.39q-.724-.121-1.466-.121q-1.48 0-2.88.448T12 18.769m-4.75-7.128"/>
                            </svg>
                        </button>
                    }
                    content={() => <div style={{ width: '100px' }}>Dictionary</div>}
                    offset={{ left: 0, top: -8 }}
                />
                }
                content={() => <div style={{ width: '100px' }}>Dictionary</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );
    //add note function
    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = async () => {
            const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            if (message.trim() !== '') {
                const note: Note = {
                    id: uniqueId,
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                };
                const Notedata = {

                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                    book_id ,
                    userIdMain

                }
                // console.log("added  new note format" ,note);

                // Save note to the backend
                try {
                    const response = await axios.post('https://api.netbookflix.com/api/highlight-notes', Notedata, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    setNotes(notes.concat([note]));
                    props.cancel(); // Cancel the highlight input
                } catch (error) {
                    console.error('Error adding note:', error);
                }
            }
        };

        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid rgba(0, 0, 0, .3)',
                    borderRadius: '2px',
                    padding: '8px',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    zIndex: 1,
                }}
            >
                <textarea
                    rows={3}
                    style={{ border: '1px solid rgba(0, 0, 0, .3)' }}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                ></textarea>
                <div style={{ display: 'flex', marginTop: '8px' }}>
                    <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        );
    };
    //jump to note
    const jumpToNote = (note: Note) => {
        // Activate the Notes tab before scrolling

        const sidebarContainer = document.querySelector('.rpv-default-layout__sidebar--ltr');
        const sidebarContent = document.querySelector('.rpv-default-layout__sidebar-content--ltr');

        if (sidebarContainer && sidebarContent) {
            console.log("class of sidebar", sidebarContainer, sidebarContent);
            sidebarContainer.classList.remove("rpv-default-layout__sidebar--opened")
            sidebarContent.classList.remove("rpv-default-layout__sidebar-content--opened")
        }
        activateTab(1);
        
        // Check if the note element exists and scroll into view
        const noteElement = noteEles.get(note.id);

        if (noteElement) {
            noteElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

const renderHighlights = React.useCallback(
    (props: RenderHighlightsProps) => {
        return (
            <div>
                {notes
                    .filter((note) =>
                        note.highlightAreas.some((area) => area.pageIndex === props.pageIndex)
                    )
                    .map((note) =>
                        note.highlightAreas
                            .filter((area) => area.pageIndex === props.pageIndex)
                            .map((area, idx) => (
                                <div
                                    key={`${note.id}-${idx}`}
                                    style={{
                                        background: 'yellow', // Highlight color
                                        opacity: 0.4, // Transparency level
                                        ...props.getCssProperties(area, props.rotation), // Positioning
                                    }}
                                    onClick={() => jumpToNote(note)} // Handle click to jump
                                    ref={(ref) => {
                                        if (ref) {
                                            noteEles.set(note.id, ref as HTMLElement);
                                        }
                                    }}
                                />
                            ))
                    )}
            </div>
        );
    },
    [notes, noteEles] // Dependencies
);

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights,
    });
    // bookmark plagin
    const bookmarkPluginInstance = bookmarkPlugin();
    const { Bookmarks } = bookmarkPluginInstance;

    React.useEffect(() => {
        fetchNotes(); // Fetch notes on component mount
        // if (!hasFetchedBookmarks.current) {
        //     fetchBookmarks(); // Fetch bookmarks only once
        //     hasFetchedBookmarks.current = true; // Mark that fetchBookmarks has been called
        // }
    }, []);
    
    const fetchNotes = async () => {
        try {            
            // Fetch the notes from the API (getting both the first note and the remaining ones)
            const response = await axios.post('https://api.netbookflix.com/api/highlight-notes-get', { book_id , userIdMain});
            const notesArray = response.data.response; // Assuming 'response' contains the notes
                    // Extract the first note to add it directly to the state
                const firstNote = notesArray[0];
                const note: Note = {
                    id: firstNote.id,  // ID of the note
                    content: firstNote.content,  // Content of the note
                    highlightAreas: [JSON.parse(firstNote.highlight_area)],  // Assuming the highlight_area is a JSON string
                    quote: firstNote.quote  // Quote associated with the note
                };
                // console.log('added first not format', note)
                // First add the first note directly to the state
                setNotes(notes.concat([note]));

            
            // Now process the remaining notes
            const processedNotes = notesArray.map((note: any) => ({
                id: note.id,
                content: note.content,
                highlightAreas: [JSON.parse(note.highlight_area)],
                quote: note.quote,
            }));
    
            // Use setNotes to merge the new notes with the existing ones
            setNotes((prevNotes) => {
                // Concatenate the new notes (excluding the first note) to the previous ones
                const updatedNotes = [...prevNotes, ...processedNotes];
    
                // Filter out duplicates by ID
                const uniqueNotes = updatedNotes.filter(
                    (note, index, self) =>
                        index === self.findIndex((n) => n.id === note.id)
                );
    
                return uniqueNotes;
            });
    
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };
    //notes
    const sidebarNotes = (
        <div style={{ overflow: 'auto', width: '100%' }}>
            {notes.length === 0 && <div style={{ textAlign: 'center' }}>No notes available for this book</div>}
            {notes.map((note) => (
                <div
                    key={note.id}
                    style={{ borderBottom: '1px solid rgba(0, 0, 0, .3)', cursor: 'pointer', padding: '8px' }}
                    onClick={() => jumpToNote(note)}
                        ref={(ref): void => {
                            noteEles.set(note.id, ref as HTMLElement);
                        }}
                >
                    <blockquote
                        style={{
                            borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                            fontSize: '.75rem',
                            lineHeight: 1.5,
                            margin: '0 0 8px 0',
                            paddingLeft: '8px',
                            textAlign: 'justify',
                        }}
                    >
                        {note.quote}
                    </blockquote>
                    <div>{note.content}</div>
                </div>
            ))}
        </div>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [
            // ...defaultTabs,
            defaultTabs[0], // Bookmarks tab
            {
                content: sidebarNotes,
                icon: <MessageIcon />,
                title: 'Notes',
            },
            // {
            //     content: (
            //         // <SearchSidebar
            //         //     searchPluginInstance={defaultLayoutPluginInstance.toolbarPluginInstance.searchPluginInstance}
            //         // />
            //         <SearchSidebar  searchPluginInstance={searchPluginInstance} />

            //     ),
            //     icon: <SearchIcon />,
            //     title: 'Search',
            // },
            {
                content:bookmark,
                icon: <BookmarkIcon />,
                title: 'Bookmark',
            }, 
        ],
        renderToolbar,
        toolbarPlugin: {
            fullScreenPlugin: {
                // Explicitly manage fullscreen functionality here
                getFullScreenTarget: (pagesContainer: HTMLElement): HTMLElement => {
                    const target = pagesContainer.closest('[data-testid="default-layout__body"]');
                    return target as HTMLElement; // Use type assertion
                },
            },
        },
    });

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { CurrentPageLabel } = pageNavigationPluginInstance;
 
    // const searchPluginInstance = searchPlugin({
    //     keyword: [
    //         'document',
    //         {
    //             keyword: 'PDF',
    //             matchCase: true,
    //         },
    //     ],
    // });
    const searchPluginInstance = searchPlugin();

    const fullScreenPluginInstance = fullScreenPlugin({});

    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

    const { activateTab } = defaultLayoutPluginInstance;

    // render the first  pages initially
    const setRenderRange: SetRenderRange = React.useCallback((visiblePagesRange: VisiblePagesRange) => {
        return {
            startPage: visiblePagesRange.startPage - 1000,
            endPage: visiblePagesRange.endPage + 1000,
        };
    }, []);
    
    return (
    <div ref={viewerRef} style={{ height: '100%', position: 'relative' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            theme="auto" 
            fileUrl={fileUrl}
            plugins={[
              highlightPluginInstance,
              defaultLayoutPluginInstance,
              searchPluginInstance,
              fullScreenPluginInstance,
            ]}
            setRenderRange={setRenderRange} 
            onDocumentLoad={handleDocumentLoad}
            defaultScale={1}
            onPageChange={handlePageChange}
          />
        </Worker>
        
        {/* Bookmark Icon */}
      
        <div className="cust-bookmark-timer-pdf">
          {/* Bookmark button */}
          {/* <div className="bookmark-icon-test"> */}

          <button className="pdf-cust-epub-button-bookmark" onClick={() => currentDoc && addBookmark(currentPage)}
            style={{ cursor: 'pointer', color: '#ff5718' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 21l-7-5l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
            {/* <FaBookmark
            onClick={() => currentDoc && addBookmark(currentPage)}
            style={{ cursor: 'pointer', color: 'blue' }}
            /> */}
         {/* </div> */}


          {/* Timer button */}
          <button className="cust-epub-button-timer" onClick={() => setIsTimerVisible(!isTimerVisible)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="m20.145 8.27l1.563-1.563l-1.414-1.414L18.586 7c-1.05-.63-2.274-1-3.586-1c-3.859 0-7 3.14-7 7s3.141 7 7 7s7-3.14 7-7a6.97 6.97 0 0 0-1.855-4.73M15 18c-2.757 0-5-2.243-5-5s2.243-5 5-5s5 2.243 5 5s-2.243 5-5 5" />
              <path fill="currentColor" d="M14 10h2v4h-2zm-1-7h4v2h-4zM3 8h4v2H3zm0 8h4v2H3zm-1-4h3.99v2H2z" />
            </svg>
          </button>
                {isTimerVisible && (
                <div className="timer-modal">
                    <div className="timer-header">
                    <h3>Timer</h3>
                    <button onClick={() => setIsTimerVisible(false)}>X</button>
                    </div>
                    <div className="timer-display">
                    <button className='timer-plus-minus-button' onClick={() => handleAddTime(-60)}>-1</button>
                    <span>{formatTime(time)}</span>
                    <button className='timer-plus-minus-button' onClick={() => handleAddTime(60)}>+1</button>
                    </div>
                    <div className="timer-controls">
                    <button className="timer-controls-button" onClick={() => handleAddTime(10 * 60)}>10 min</button>
                    <button className="timer-controls-button" onClick={() => handleAddTime(20 * 60)}>20 min</button>
                    <button className="timer-controls-button" onClick={() => handleAddTime(30 * 60)}>30 min</button>
                    </div>
                    <div className="timer-start">
                    <button onClick={handleStartPause}>
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    </div>
                </div>
                )}
        </div>

    
         {/* Time Up Notification */}
        {isTimeUp && (
          <div className="time-up-notification">
            <p>Time's up!</p>
            <button onClick={closeNotification}>Close</button>
          </div>
        )}

         {/* Text to speeach */}
         {showTextToSpeeshPopup &&
          <div
            className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} selection-popup-text-to-speech`}
            style={{
              position: 'absolute',
              top: `${selectionPosition.y + window.scrollY}px`, // Adjust for page scroll
              right: `${selectionPosition.x + window.scrollX}px`, // Adjust for page scroll
              background: '#fff',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 1001,
              width: '350',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                TextToSpeeshPopup(prev => !prev);
                handleStop();
              }} // Hide popup when clicked and stop Text to voice
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                width: '25px',
                height: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <label>
              Voice:
              <select className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} value={voice?.name} onChange={handleVoiceChange}>
                {window.speechSynthesis.getVoices().map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </label>

            <br />

            <label>
              Pitch:
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
              />
            </label>

            <br />

            <label>
              Speed:
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={handleRateChange}
              />
            </label>
            <br />
            <label>
              Volume:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </label>
            <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleStop}>Stop</button>

          </div>
        } 
      </div>  
    );
    
};

export default PDF_E_reader;

