import * as React from 'react';
import { useEffect, useState ,useRef } from "react";
import { Button, DocumentLoadEvent, Icon, PdfJs, Position, PrimaryButton, RenderPageProps, Tooltip, Viewer, Worker } from '@react-pdf-viewer/core';
import { BookmarkIcon, defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
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
    book_id : string | unknown
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

const PDF_E_reader: React.FC<HighlightExampleProps> = ({ fileUrl  ,

    book_id , resource, updateUserReadingStats, resourceId, updateUserAndBookStats}) => {
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
    // Bookmark 
    const [bookmarkedPages, setBookmarkedPages] = React.useState<Bookmark[]>([]);
    const bookmarkContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(null);
    const viewerRef = React.useRef<HTMLDivElement | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const hasFetchedBookmarks = useRef(false); // Track if fetchBookmarks has been called
   const [pageIndexB, setPageIndexB] = useState<number>(0)

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
            <Tooltip
                position={Position.TopCenter}
                target={
                    <Button onClick={props.toggle}>
                        <MessageIcon />
                    </Button>
                }
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
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
            {
                content: (
                    <SearchSidebar
                        searchPluginInstance={defaultLayoutPluginInstance.toolbarPluginInstance.searchPluginInstance}
                    />
                ),
                icon: <SearchIcon />,
                title: 'Search',
            },
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
 
    const searchPluginInstance = searchPlugin({
        keyword: [
            'document',
            {
                keyword: 'PDF',
                matchCase: true,
            },
        ],
    });
    const fullScreenPluginInstance = fullScreenPlugin({});

    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

    const { activateTab } = defaultLayoutPluginInstance;

    return (
    <div ref={viewerRef} style={{ height: '100%', position: 'relative' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[
              highlightPluginInstance,
              defaultLayoutPluginInstance,
              searchPluginInstance,
              fullScreenPluginInstance,
            ]}
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
      </div>  
    );
    
};

export default PDF_E_reader;

