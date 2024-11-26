import * as React from 'react';
import { useEffect, useState } from "react";
import { Button, DocumentLoadEvent, PdfJs, Position, PrimaryButton, Tooltip, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
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


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import './PdfReader.module.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';

import axios from 'axios';
import SearchSidebar from './SearchSidebar';
import styles from "./PdfReader.module.css";

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
    
    const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(null);
    const handleDocumentLoad = (e: DocumentLoadEvent) => {
        setCurrentDoc(e.doc);
    };

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

    const jumpToNote = (note: Note) => {
        // Activate the Notes tab before scrolling
        activateTab(3);
        // console.log("jumpto note" , note);
        
        // Check if the note element exists and scroll into view
        const noteElement = noteEles.get(note.id);

        // console.log("noteElement  note" , noteElement);


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

    React.useEffect(() => {
        fetchNotes(); // Fetch notes on component mount
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
            ...defaultTabs,
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
        ],
        renderToolbar,
        toolbarPlugin: {
            fullScreenPlugin: {
                // Explicitly manage fullscreen functionality here
                getFullScreenTarget: (pagesContainer) => {
                    return pagesContainer.closest('[data-testid="default-layout__body"]');
                },
            },
        },
    });

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
        <div style={{ height: '100%' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
                fileUrl={fileUrl}
                plugins={[highlightPluginInstance, defaultLayoutPluginInstance ,searchPluginInstance,fullScreenPluginInstance ]}
                onDocumentLoad={handleDocumentLoad}
                defaultScale={1}
            />
         </Worker>    
        </div>
    );
};

export default PDF_E_reader;

