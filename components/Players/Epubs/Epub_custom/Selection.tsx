import { useState, useEffect, useRef } from 'react'
import { ReactReader ,ReactReaderStyle , type IReactReaderStyle } from './lib/index'
import { Contents, NavItem, Rendition } from 'epubjs'
import { get, post, getWithParam } from '@/utils/fetch';
import Image from "next/image";


import { useSession } from "@/providers/SessionProvider";
import './style.css'
import axios from 'axios'
import { log } from 'console';

// NBf Logo For E pubreader
import nbfLogo from "@/public/icons/NetBookFlix_Logo.png";

type ITextSelection = {
  text: string
  cfiRange: string
}

// Highlight
interface SelectionProps {
  resourceLink: string; // Change this to match the prop being passed
  title: string;
  book_id: string;
}

// Search
interface SearchResult {
  cfi: string;
  excerpt: string;
}

export const Selection: React.FC<SelectionProps> = ({ resourceLink, title, book_id }) => {

  const [selections, setSelections] = useState<ITextSelection[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('') // For Search Functionality
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined)

  const [location, setLocation] = useState<string | number>(0)
  const [activeSidebar, setActiveSidebar] = useState<string>('selections') // For managing which sidebar is open
  const [selectedText, setSelectedText] = useState<ITextSelection | null>(null)
  const [showPopup, setShowPopup] = useState(false);
  const [showTextToSpeeshPopup, TextToSpeeshPopup] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [addNoteActive ,SetaddNoteActive] = useState(false);
  const [highlightAnnotations, setHighlightAnnotations] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]); // For Bookmark Functionality
  const [lineHeight, setLineHeight] = useState(1.6); // Initial value for Setting Line Height
  const [EpubfontSize, setFontSize] = useState(18); //Epub Font size
  const [EpubfontFamity, setFontFamily] = useState(""); //Epub Font Family
  const [horizontalMargin, setHorizontalMargin] = useState(10);
  const [verticalMargin, setVerticalMargin] = useState(10);
  const [scrollMode, setScrollMode] = useState<'paginated' | 'scrolled'>('scrolled'); //Scrooling Mode
  const [theme, setTheme] = useState<ITheme>('light');
  const [dictionaryModal, setShowdictionaryModal] = useState(false); //Dictionary Modal  
  const Userefrendition = useRef<Rendition | undefined>(undefined)

  const [sidebar, setSidebar] = useState(false)
  const { session } = useSession();

  const userIdMain = session?.user?.user_id;

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
  
  // text to speeach
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null); // Updated type
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  //  pronounce selected text
  const handlePlay = () => {
   
      if (selectedText?.text) {
        const synth = window.speechSynthesis;
        const textChunks = selectedText.text.split(/(\n|\.)/).filter(Boolean); // Split by new lines or periods
        const utterances: SpeechSynthesisUtterance[] = [];
    
        textChunks.forEach((chunk) => {
          const u = new SpeechSynthesisUtterance(chunk.trim());
    
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
  const handlePitchChange = (event :any) => {
    setPitch(parseFloat(event.target.value));
  };
  //Rate change
  const handleRateChange = (event :any) => {
    setRate(parseFloat(event.target.value));
  };
  //Volume Change
  const handleVolumeChange = (event: any) => {
    setVolume(parseFloat(event.target.value));
  };
  // Line Height Increase
  const handleIncrease = () => {
    if (lineHeight < 2.0) {
      setLineHeight(prev => parseFloat((prev + 0.1).toFixed(1)));
    }
  };

  // Line Line Increase
  const handleDecrease = () => {
    if (lineHeight > 1.0) {
      setLineHeight(prev => parseFloat((prev - 0.1).toFixed(1)));
    }
  };
  //Font Increase
  const handleFontIncrease = () => {
    if (EpubfontSize) {
      setFontSize(prev => parseFloat((prev + 0.1).toFixed(1)));
    }
  };
  
  //Font Decrease
  const handleFontDecrease = () => {
    if (EpubfontSize) {
      setFontSize(prev => parseFloat((prev - 0.1).toFixed(1)));
    }
  };

  //  Apply Epub reader styles dynamically
  useEffect(() => {
    if (rendition) {
      rendition.themes.override("font-size", `${EpubfontSize}px`);
      rendition.themes.override("font-family", `${EpubfontFamity}`);
      rendition.themes.override("line-height", `${lineHeight}`);
      rendition.themes.override("padding-top", `${verticalMargin}px`);
      rendition.themes.override("padding-bottom", `${verticalMargin}px`);
      rendition.themes.override("padding-left", `${horizontalMargin}px`);
      rendition.themes.override("padding-right", `${horizontalMargin}px`);  
          // toggleTheme();
      // applyTheme(rendition, theme); // Apply the selected theme


    }
  }, [EpubfontSize, EpubfontFamity  ,lineHeight, ,verticalMargin ,horizontalMargin ,rendition ,theme]); // Runs whenever font size ,family , line ,margin  or rendition changes

  //vertical margin Increase
  const handleHorizontalMarginIncrease = () => {
    if (horizontalMargin < 50) {
      setHorizontalMargin(prev => Number((prev + 1).toFixed(1)));
    }
  };

  type ITheme = 'light' | 'dark'

  function updateTheme(rendition: Rendition, theme: ITheme) {
    const themes = rendition.themes
    const modal = document.getElementById('modal_pdf_epub_reader')
  
    // Register themes first (if not already registered)
    themes.register('light', {
      body: { color: '#000', 'background-color': '#fff' },
    })
    themes.register('dark', {
      body: { color: '#fff', 'background-color': '#000' },
    })
  
    switch (theme) {
      case 'dark': {
        themes.select('dark') // Apply dark theme
        themes.override('color', '#fff')
        themes.override('background-color', '#000')
  
        // Update modal styling
        if (modal) {
          modal.style.color = '#fff'
          modal.style.backgroundColor = '#000'
        }
        break
      }
      case 'light': {
        themes.select('light') // Apply light theme
        themes.override('color', '#000')
        themes.override('background-color', '#fff')
  
        // Update modal styling
        if (modal) {
          modal.style.color = '#000'
          modal.style.backgroundColor = '#fff'
        }
        break
      }
      default:
        console.warn(`Unknown theme: ${theme}`)
    }
  }
  
  // Update Theme
   useEffect(() => {
    if (rendition) {
      updateTheme(rendition, theme)
    }
  }, [theme])

  //Update Scroll Mode
  useEffect(() => {
    if (rendition) {
      rendition.flow(scrollMode); // Apply scrolling mode dynamically
    }
  }, [scrollMode, rendition]); // Re-run when scrollMode changes

  //vertical margin Decrease
  const handleHorizontalMarginDecrease = () => {
    if (horizontalMargin > 0) {
      setHorizontalMargin(prev => Number((prev - 1).toFixed(1)));
    }
  };

  //vertical margin Increase
  const handleVerticalMarginIncrease = () => {
    if (verticalMargin < 50) {
      setVerticalMargin(prev => Number((prev + 1).toFixed(1)));
    }
  };

  //vertical margin Decrease
  const handleVerticalMarginDecrease = () => {
    if (verticalMargin > 0) {
      setVerticalMargin(prev => Number((prev - 1).toFixed(1)));
    }
  };

  // Button click handler
  const handleTextToSpeech = () => {
    TextToSpeeshPopup(true);
    console.log("handleTextToSpeech called");
  };
  // 
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };
  //Handle add Time 
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

  // Search
  const handleSearch = async () => {
    if (!rendition || !searchQuery) {
      setSearchResults([])
      return
    };

    try {
      const results: SearchResult[] = [];

      const highlightText = (text: string, query: string) => {
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(
          regex,
          '<mark style="background-color: #FF6F61;">$1</mark>'
        );
      };

      //do Search
      const doSearch = (q: string) => {
        return Promise.all(
          (rendition.book.spine as any).spineItems.map((item: any) =>
            item
              .load(rendition.book.load.bind(rendition.book))
              .then(item.find.bind(item, q))
              .finally(item.unload.bind(item))
          )
        ).then((results) => [].concat.apply([], results));
      };

      const allResults = await doSearch(searchQuery);
      results.push(...allResults);

      const highlightedResults = results.map((result) => ({
        ...result,
        excerpt: highlightText(result.excerpt, searchQuery),
      }));

      // Update search results
      setSearchResults(highlightedResults);

      allResults.forEach((result) => {
        const typedResult = result as SearchResult;

        if (typedResult.cfi) {
          try {
            const validCfi = String(typedResult.cfi).trim();
            if (!validCfi.startsWith("epubcfi(")) {
              throw new Error("Invalid CFI format");
            }

          } catch (error) {
            console.error("Error highlighting result:", typedResult, error);
          }
        } else {
          console.warn("Invalid CFI for result:", typedResult);
        }
      });

    } catch (error) {
      console.error("Error searching the book:", error);
    }
  };

  // Handle navigation to a search result
  const handleNavigateToResult = (result: string) => {
    try {
      // Validate the result string
      if (!result.startsWith("epubcfi(")) {
        throw new Error("Invalid CFI format");
      }

      const [href, index] = result.split("#");
      const validCfi = result.trim(); // Trim any extra spaces

      rendition
        ?.display(href)
        .then(() => {
          // Add the highlight annotation and store it in highlightAnnotations
          const annotation = rendition.annotations.add(
            'highlight',
            validCfi,
            {},
            (e: MouseEvent) => console.log("Highlight clicked:", validCfi),
            'hl',
            { fill: '#FF6F61', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
          );

          // Update the highlightAnnotations state
          setHighlightAnnotations(prevAnnotations => [...prevAnnotations, annotation]);
        })
        .catch((error) => {
          console.error("Error navigating or highlighting:", error);
        });
    } catch (error) {
      console.error("Error processing navigation result:", error);
    }
  };
  //Handle Close Sidebar
  const handleCloseSidebar = () => {
    setSidebar(false);
    setSearchResults([]);
    setSearchQuery('')
    if (rendition) {

      highlightAnnotations.forEach((annotation) => {
        rendition.annotations.remove(annotation.cfiRange, 'highlight');
      });
    }
  };

  // fetch Dynamic Highlight
  const fetchHighlights = async () => {

    try {
      const response = await axios.post(`${process.env.API_URL}highlights-epub/list`, {
        book_id,
        user_id: userIdMain,
      });

      if (response.data && response.data.message) {

        response.data.message.forEach((highlightData: any) => {

          if (rendition) { // Ensure rendition is defined before accessing it

            rendition.annotations.add(
              'highlight',
              highlightData.cfi_range,
              {},
              (e: MouseEvent) => console.log(""),
              'hl',
              { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
            );

            setSelections((list) =>
              list.concat({
                text: highlightData.content || '',
                cfiRange: highlightData.cfi_range,
              })
            );
          } else {
            console.error('Rendition is undefined. Highlight cannot be added.');
          }
        });
      } else {
        console.error('Message array not found in the response');
      }

      // Handle new highlights added by the user
      if (rendition) {
        function setRenderSelection(cfiRange: string, contents: Contents) {
          if (rendition) {
            const selectedText = rendition.getRange(cfiRange).toString();

            rendition.annotations.add(
              'highlight',
              cfiRange,
              {},
              (e: MouseEvent) => console.log(""),
              'hl',
              { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
            );

            // setSelections((list) =>
            //   list.concat({
            //     text: selectedText,
            //     cfiRange,
            //   })
            // );

            // handleAddHighlight(selectedText, cfiRange);

            const selection = contents.window.getSelection();
            selection?.removeAllRanges();
          }
        }

        rendition.on('selected', setRenderSelection);

        return () => {
          rendition?.off('selected', setRenderSelection);
        };
      }
      else {
        console.error('Rendition is undefined. Highlight cannot be added.');
      }
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  useEffect(() => {
    if (rendition) {
      fetchHighlights();
      fetchBookmarks();
    }
  }, [rendition]);
  //add highlight in database 
  const handleAddHighlight = async (text: string, cfiRange: string) => {
    try {

      // Construct the highlight payload
      const highlight = {
        text,
        cfiRange,
        book_id,
        userIdMain,
      };

      // Send the API request
      const response = await axios.post(
        `${process.env.API_URL}highlights-epub/add`,
        highlight
      );

    } catch (error) {
      console.error('Error adding highlight:', error);
    }
  };
  // Remove Highlight
  const handleRemoveHighlight = async (cfiRange: string) => {
    try {

      // API call to remove the highlight on the server
      const response = await axios.post(
        `${process.env.API_URL}highlights-epub/remove`,
        {
          cfiRange,
          book_id,
          userIdMain,
        }
      );

      if (response.data.message === 204) {

        // Remove the highlight from the EPUB rendering
        if (rendition) {
          rendition.annotations.remove(cfiRange, 'highlight');
        }

        // Update the selections state
        setSelections((prevSelections) =>
          prevSelections.filter((selection) => selection.cfiRange !== cfiRange)
        );
      } else {
        console.error('Failed to remove highlight:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing highlight:', error);
    }
  };

  // Render Selecetd text
  function setRenderSelection_2(cfiRange: string) {
    console.log("setRenderSelection_2 called");
    if (rendition) {
      const selectedText = rendition.getRange(cfiRange).toString();

      setSelections((list) =>
        list.concat({
          text: selectedText,
          cfiRange,
        })
      );

      // Add the highlight to the EPUB rendering
      rendition.annotations.add(
        'highlight',
        cfiRange,
        {},
        (e: MouseEvent) => console.log(''),
        'hl',
        { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
      );

      setSelectedText({
        text: selectedText,
        cfiRange,
      });
      // setSelectionPosition({ x: rect?.left || 0, y: rect?.top || 0 });

      // Send the highlight to the API
      handleAddHighlight(selectedText, cfiRange);

      // const selection = contents.window.getSelection();
      // selection?.removeAllRanges();
      setShowPopup(false); //close selected text modal

    }
  }

  // Function to add selections and highlight text
  useEffect(() => {
    // Ensure both are available before running
    if (!rendition || !addNoteActive) return; 

    if (rendition) {
      console.log("setRenderSelection_3 outside");

      console.log("selectedText" ,selectedText);

      // Extract cfiRange into a variable
      const cfiRangeValue = selectedText!.cfiRange;

      console.log("Extracted cfiRange:", cfiRangeValue);
      
      function setRenderSelection_3(cfiRange: string, contents: Contents) {
        console.log("setRenderSelection_3 inside");

        if (!cfiRange || !rendition) {
          console.warn("Invalid cfiRange or rendition is undefined");
          return;
        }
      
        const selectedText = rendition.getRange(cfiRange).toString();
        console.log("Selected Text:", selectedText);
      
        // Save the selection
        setSelections((prev) => [...prev, { text: selectedText, cfiRange }]);
      
        // Highlight the text
        rendition.annotations.add(
          'highlight',
          cfiRange,
          {},
          (e: MouseEvent) => console.log('Highlight clicked'),
          'hl',
          { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
        );
      
        // if (rendition) {
        //   const selectedText = rendition.getRange(cfiRange).toString();

        //   setSelections((list) =>
        //     list.concat({
        //       text: selectedText,
        //       cfiRange,
        //     })
        //   );

        //   // Add the highlight to the EPUB rendering
        //   rendition.annotations.add(
        //     'highlight',
        //     cfiRange,
        //     {},
        //     (e: MouseEvent) => console.log(''),
        //     'hl',
        //     { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
        //   );

        //   setSelectedText({
        //     text: selectedText,
        //     cfiRange,
        //   });
        //   // setSelectionPosition({ x: rect?.left || 0, y: rect?.top || 0 });
    
        //   // Show the popup with options
         
        //   // Send the highlight to the API
        //   // handleAddHighlight(selectedText, cfiRange);

        //   const selection = contents.window.getSelection();
        //   selection?.removeAllRanges();
        // }
      }
      // setRenderSelection_3(cfiRangeValue);

      rendition.on('rendered', setRenderSelection_3);
      return () => {
        rendition?.off('rendered', setRenderSelection_3);
      };
    } 
  }, [rendition ,addNoteActive]);

  //show pop on select text
  useEffect(()=>{
    setShowPopup(true);
  } ,[selectedText]);

  useEffect(() => {

    if (rendition) {
      setShowPopup(true);
      console.log("text is selecetd");
      
      function setRenderSelection(cfiRange: string, contents: Contents) {
        // console.log("testdata" ,testdata);
        if (rendition) {
          const selectedText = rendition.getRange(cfiRange).toString();

          // setSelections((list) =>
          //   list.concat({
          //     text: selectedText,
          //     cfiRange,
          //   })
          // );

          // Add the highlight to the EPUB rendering
          // rendition.annotations.add(
          //   'highlight',
          //   cfiRange,
          //   {},
          //   (e: MouseEvent) => console.log(''),
          //   'hl',
          //   { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
          // );

          setSelectedText({
            text: selectedText,
            cfiRange,
          });
          // setSelectionPosition({ x: rect?.left || 0, y: rect?.top || 0 });
    
         
          // Send the highlight to the API
          // handleAddHighlight(selectedText, cfiRange);

          const selection = contents.window.getSelection();
          selection?.removeAllRanges();
        }
      }

      rendition.on('selected', setRenderSelection);
      // return () => {
      //   rendition?.off('selected', setRenderSelection);
      // };
    } 
  }, [rendition]);

  const handleDictionary = () => {
    console.log('Dictionary for:', selectedText?.text);
    // Open a dictionary lookup for the selected text
    setShowdictionaryModal(true) // Close the popup after the action
  };
  
  const handleTranslate = () => {
    console.log('Translate:', selectedText?.text);
    // Open a translation service for the selected text
    setShowPopup(false); // Close the popup after the action
  };
  // Add bookmark function
  const handleAddBookmark = async () => {
    try {
      const currentLocation = rendition!.location; // Get the current reading location

      // Collect necessary data for the bookmark
      const bookmark = {
        cfiRange: location,
        title: title,
        timestamp: new Date().toISOString(),
        book_id: book_id,
        userIdMain: userIdMain,
      };
      // Send the bookmark data to the API
      const response = await post(`${process.env.API_URL}bookmarks-epub/add`, bookmark);
      // Check the API response
      if (response.status === 200 || response.status === 201) {

        setBookmarks((prevBookmarks) => [...prevBookmarks, bookmark]);
      } else {
        console.error("Failed to add bookmark:");
      }

    } catch (error) {
      console.error("Error adding bookmark:");
    }
  };


  // Fetch Dynamic Bookmark
  const fetchBookmarks = async () => {

    try {
      const response = await getWithParam(`${process.env.API_URL}bookmarks-epub/list`, {
        book_id,
        userIdMain: userIdMain, // Correct the parameter key
      });

      if (response.message && Array.isArray(response.message)) {
        response.message.forEach((Bookmark: any) => {
          // Match the keys from the response
          const bookmark = {
            cfiRange: Bookmark.cfi_range, // Updated to match API response
            title: Bookmark.content,     // Assuming 'content' is equivalent to 'title'
            timestamp: Bookmark.created_at,
            book_id: Bookmark.book_id,
            userIdMain: Bookmark.user_id, // Using 'user_id' from the response
          };

          // Update the state with the new bookmark
          setBookmarks((prevBookmarks) => [...prevBookmarks, bookmark]);
        });
      } else {
        console.error("Message array not found in the response");
      }
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  //got to bookmark
  const navigateToLocation = (cfiRange: any) => {
    rendition!.display(cfiRange);
  };

  //delete bookmark
  const handleDeleteBookmark = async (cfiRange: string) => {

    try {
      const response = await getWithParam(`${process.env.API_URL}bookmarks-epub/remove`, {
        book_id,
        userIdMain: userIdMain,
        cfiRange: cfiRange, // Ensure parameter matches the API spec
      });

      if (response.message === 204) {
        // Filter out the deleted bookmark based on its cfiRange
        const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.cfiRange !== cfiRange);
        setBookmarks(updatedBookmarks);
      } 
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };
  const updatePageContent = (content: string) => {
    // handleDisplayed(content)
  };
  // Callback function to update the page content
  // Close notification
  const closeNotification = () => {
    setIsTimeUp(false);
  };

  const applyTheme = (rendition: any, mode: any) => {
    if (mode === "dark") {
      rendition.themes.register("dark", {
        body: { "background-color": "#121212", color: "#ffffff" },
        p: { color: "#ffffff" },
      });
    } else if (mode === "light") {
      rendition.themes.register("light", {
        body: { "background-color": "#ffffff", color: "#000000" },
        p: { color: "#000000" },
      });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(rendition, newTheme); // Apply the selected theme
  };

  return (
    <div className='wrapper-container'>
      <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} side-icons`}>
        <br />
        <a href="https://netbookflix.com/" className='cust-epub-button-nbf'>  <Image style={{ width:"41px",height: "51px" }} src={nbfLogo} alt="NBF" /></a>
        <br /><br />
        <br />
        <button className='cust-epub-button' onClick={() => {
          setSidebar(true)
          setActiveSidebar('selections')
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="m469.333 426.667l-42.666 42.666H149.333L192 426.667zm-364.165-82.338l62.502 62.502l-61.003 30.502L64 448l10.667-42.667zM125.1 236.261l151.037 151.037l-5.165 5.314l-5.875-.29l-6.153-.096q-15.73.004-34.944 2.44l-8.03 1.128l-7.846 1.292l-7.507 1.39l-9.23 1.902l-78.438-78.438c1.558-6.273 3.137-14.044 4.384-23.273q3.797-28.096 2.79-56.904l3.305-3.722zM346.327 44.957l120.68 120.68l-18.036 23.249l-32.555 41.5l-19.099 23.965l-17.014 21.002l-11.393 13.809l-13.367 15.819l-8.658 9.92l-7.485 8.255l-6.314 6.589l-14.992 14.827l-27.059 27.454l-151.059-151.059l2.563-2.621l37.854-37.624l11.667-11.196l12.974-11.881l11.319-9.998l12.156-10.437l12.991-10.875l13.828-11.314l14.664-11.752l23.564-18.45l16.754-12.85l17.59-13.286z" />Selections</svg>
        </button>
        <br />
        <button className='cust-epub-button' onClick={() => {
          setSidebar(true)
          setActiveSidebar('search')
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 740 840"><path fill="currentColor" d="M734 668q8 9 0 17l-49 49q-3 3-8 3t-8-3L519 584q-50 38-112 55t-133 6q-53-8-99-33t-83-61t-59-85T3 366q-10-79 16-150T96 95t121-76T367 3q53 7 100 30t84 59t62 82t33 100q11 69-6 131t-55 114zM325 557q48 0 90-18t74-50t50-74t18-90t-18-90t-50-74t-74-50t-90-18t-90 18t-73 50t-50 74t-18 90t18 90t50 74t73 50t90 18" /></svg>
        </button>
        <br />
        <button className='cust-epub-button' onClick={() => {
          setSidebar(true)
          setActiveSidebar('bookmarks')
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 21l-7-5l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
        </button>
        <br />
        {/* Setting Button */}
        <button className='cust-epub-button' onClick={() => {
          setSidebar(true)
          setActiveSidebar('settings')
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 10.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5m0-4c-.83 0-1.5.67-1.5 1.5S7.17 9.5 8 9.5S9.5 8.83 9.5 8S8.83 6.5 8 6.5"/><path fill="currentColor" d="M8.85 15h-1.7c-.32 0-.6-.22-.67-.53l-.41-1.79l-1.56.98c-.27.17-.62.13-.85-.1l-1.2-1.2a.68.68 0 0 1-.1-.85l.98-1.56l-1.79-.41a.686.686 0 0 1-.53-.67v-1.7c0-.32.22-.6.53-.67l1.79-.41l-.98-1.56a.68.68 0 0 1 .1-.85l1.2-1.2c.23-.23.58-.27.85-.1l1.56.98l.41-1.79c.07-.31.35-.53.67-.53h1.7c.32 0 .6.22.67.53l.41 1.79l1.56-.98c.27-.17.62-.13.85.1l1.2 1.2c.23.23.27.58.1.85l-.98 1.56l1.79.41c.31.07.53.35.53.67v1.7c0 .32-.22.6-.53.67l-1.79.41l.98 1.56c.17.27.13.62-.1.85l-1.2 1.2c-.23.23-.58.27-.85.1l-1.56-.98l-.41 1.79c-.07.31-.35.53-.67.53M7.4 14h1.2l.67-2.92l2.54 1.59l.85-.85l-1.59-2.54l2.92-.67v-1.2l-2.92-.67l1.59-2.54l-.85-.85l-2.54 1.59l-.67-2.92H7.4l-.67 2.92l-2.54-1.59l-.85.85l1.59 2.54l-2.92.67v1.2l2.92.67l-1.59 2.54l.85.85l2.54-1.59zm6.84-6.55"/></svg>
        </button>
        <br />
      </div>

      {sidebar && (
        <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} sidebar-drawer`}>
          <div className="sidebar-header">
            <div aria-readonly>{activeSidebar == "selections" ? "Highlights" : activeSidebar}</div>
            <button onClick={handleCloseSidebar}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" /></svg></button>
          </div>
          <hr />
          <br />
          <div>
            {/* list highlight  in sidebar  */}
            {activeSidebar === 'selections' && (
              <div>
                <ul className={`${theme ==='dark' ? 'dark-theme' : ''} selection-list` }>

                  {selections && selections.map(({ text, cfiRange }, i) => {
                    // Limit the text to the first 20 characters and add "..." if the text is longer
                    const truncatedText = text.length > 20 ? `${text.slice(0, 20)}...` : text;

                    return (
                      <li key={i} className={`${theme ==='dark' ? 'dark-theme' : ''} selection-item` }  onClick={() => {
                        rendition?.display(cfiRange);
                        setSelectedText({ text, cfiRange }); // Set selected text to show in the sub-sidebar
                        setSidebar(false); // Close the sidebar when a selection is clicked
                      }}>
                        <span className={`${theme ==='dark' ? 'dark-theme' : ''}` }>{truncatedText}</span>

                        <button
                          className="action-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the list item click from being triggered
                            handleRemoveHighlight(cfiRange); // Call remove highlight
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {activeSidebar === 'search' && (
            <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} sidebar-search`}>
                <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} search-container`}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search in book"
                    value={searchQuery}
                    onChange={(e: any) => {

                      setSearchQuery(e.target.value)
                    }}
                  />
                  <button className="search-button" onClick={handleSearch}>
                    Search
                  </button>
                </div>

                <ul className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} search-results`}>
                  {searchResults.map((result, index) => (
                    <li className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} key={index} onClick={() => handleNavigateToResult(result.cfi)}>
                      {/* Use dangerouslySetInnerHTML to render the HTML content with highlighted text */}
                      <span className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSidebar === 'bookmarks' && (
              <div>
                <ul className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} bookmarks-list`}>
                  {bookmarks.map((bookmark, index) => (
                    <li  className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} key={index}>
                      <p className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} bookmark-title`} >{bookmark.title || "Untitled Bookmark"}</p>
                      <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} bookmark-actions`} >
                        <button onClick={() => {
                          navigateToLocation(bookmark.cfiRange);
                          setSidebar(false);
                        }}>
                          Go to Bookmark
                        </button>
                        <button onClick={() => handleDeleteBookmark(bookmark.cfiRange)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Setting Sidebar */}
            {activeSidebar === 'settings' && (
              <div>
                <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} cust-epub-reader-settings-option`}>
                  <button className="cust-epub-reader-close-btn"><i className="fa fa-times"></i></button>
                     <h2>Setting</h2>
                     <div className="cust-epub-reader-settings-option">
                         <label className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>View Direction</label>
                         <div className="cust-epub-reader-icon-buttons">
                             <button className={`cust-epub-reader-icon-button ${scrollMode === 'scrolled' ? 'active' : ''}`} onClick={() => setScrollMode('scrolled')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg></button>
                             <button className={`cust-epub-reader-icon-button ${scrollMode === 'paginated' ? 'active' : ''}`} onClick={() => setScrollMode('paginated')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="14" stroke-dashoffset="14" d="M15 7h-11.5M9 17h11.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="14;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M3 7l4 4M3 7l4 -4M21 17l-4 4M21 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0"/></path></g></svg></button>
                         </div>
                     </div>
                      {/* theme Change Button */}
                     <div className="cust-epub-reader-settings-option">
                         <label className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>Theme</label>
                         <div className="cust-epub-reader-plus-minus-container">
                         <button className={`cust-epub-reader-toggle-btn ${theme === "dark" ? "dark" : ""}`}
                                onClick={toggleTheme} >
                                {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                          </button>
                          </div>
                     </div>

                      {/* Font type */}
                     <div className="cust-epub-reader-settings-option">
                         <label className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} >Font</label>
                         <select className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} id="font" onChange={(event)=>setFontFamily(event.target.value)}>
                         <option value="">Original</option>
                          {/* <!-- Sans-serif Fonts --> */}
                          <option value="Arial, sans-serif">Arial</option>
                          <option value="Helvetica', 'Arial', sans-serif">Helvetica</option>
                          <option value="Verdana, sans-serif">Verdana</option>
                          <option value="Tahoma, sans-serif">Tahoma</option>
                          <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                          <option value="Gill Sans, sans-serif">Gill Sans</option>
                          <option value="Futura, sans-serif">Futura</option>
                          <option value="Impact, sans-serif">Impact</option>
                          <option value="Franklin Gothic Medium, sans-serif">Franklin Gothic Medium</option>
                          <option value="Segoe UI, sans-serif">Segoe UI</option>
                          <option value="Roboto, sans-serif">Roboto</option>
                          <option value="Open Sans, sans-serif">Open Sans</option>
                          <option value="Ubuntu, sans-serif">Ubuntu</option>
                          {/* <!-- Serif Fonts --> */}
                          <option value="Times New Roman, serif">Times New Roman</option>
                          <option value="Georgia, serif">Georgia</option>
                          <option value="Garamond, serif">Garamond</option>
                          <option value="Baskerville, serif">Baskerville</option>
                          <option value="Palatino Linotype, serif">Palatino Linotype</option>
                          <option value="Book Antiqua, serif">Book Antiqua</option>
                          <option value="Didot, serif">Didot</option>
                          <option value="Playfair Display, serif">Playfair Display</option>
                          <option value="Merriweather, serif">Merriweather</option>
                          <option value="EB Garamond, serif">EB Garamond</option>
                          <option value="Crimson Text, serif">Crimson Text</option>
                          {/* <!-- Monospace Fonts --> */}
                          <option value="Courier New, monospace">Courier New</option>
                          <option value="Lucida Console, monospace">Lucida Console</option>
                          <option value="Monaco, monospace">Monaco</option>
                          <option value="Consolas, monospace">Consolas</option>
                          <option value="Source Code Pro, monospace">Source Code Pro</option>
                          <option value="IBM Plex Mono, monospace">IBM Plex Mono</option>
                          <option value="Inconsolata, monospace">Inconsolata</option>
                          <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                          <option value="Comic Sans MS, cursive">Comic Sans MS</option>
                          <option value="Brush Script MT, cursive">Brush Script MT</option>
                          <option value="Lucida Handwriting, cursive">Lucida Handwriting</option>
                          <option value="Dancing Script, cursive">Dancing Script</option>
                          <option value="Pacifico, cursive">Pacifico</option>
                          <option value="Great Vibes, cursive">Great Vibes</option>
                          <option value="Satisfy, cursive">Satisfy</option>
                          <option value="Kaushan Script, cursive">Kaushan Script</option>
                          <option value="Lobster, cursive">Lobster</option>
                          <option value="Amatic SC, cursive">Amatic SC</option>
                          {/* <!-- Fantasy Fonts --> */}
                          <option value="Papyrus, fantasy">Papyrus</option>
                          <option value="Copperplate, fantasy">Copperplate</option>
                          <option value="Marker Felt, fantasy">Marker Felt</option>
                          <option value="Jokerman, fantasy">Jokerman</option>
                          <option value="Algerian, fantasy">Algerian</option>
                          <option value="Curlz MT, fantasy">Curlz MT</option>
                         </select>
                     </div>
                      {/* Font Size */}
                      <div className="cust-epub-reader-settings-option">
                          <label className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} >Font Size</label>
                            <div className='cust-epub-reader-plus-minus-container'>
                                <button className='cust-epub-reader-button-plus-minus' onClick={handleFontDecrease}>−</button>
                                    <span>{EpubfontSize}</span>
                                <button className='cust-epub-reader-button-plus-minus' onClick={handleFontIncrease}>+</button>
                            </div> 
                     </div>
                     {/* Line Height */}
                     <div className="cust-epub-reader-settings-option">
                     <label  className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>Line Height</label>
                        <div className='cust-epub-reader-plus-minus-container'>
                            <button className='cust-epub-reader-button-plus-minus' onClick={handleDecrease}>−</button>
                            <span>{lineHeight}</span>
                            <button className='cust-epub-reader-button-plus-minus' onClick={handleIncrease}>+</button>
                         </div>
                     </div>
                     {/* Horizontal Margin */}
                     <div className="cust-epub-reader-settings-option">
                            <label className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>Horizontal Margin</label>
                            <div className='cust-epub-reader-plus-minus-container'>
                              <button className='cust-epub-reader-button-plus-minus' onClick={handleHorizontalMarginDecrease}>−</button>
                                <span>{horizontalMargin}</span>
                              <button className='cust-epub-reader-button-plus-minus' onClick={handleHorizontalMarginIncrease}>+</button>
                           </div>
                     </div>
                     {/* {Vertical Margin} */}
                     <div className="cust-epub-reader-settings-option">
                         <label className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>Vertical Margin</label>
                         <div className='cust-epub-reader-plus-minus-container'>
                              <button className='cust-epub-reader-button-plus-minus' onClick={handleVerticalMarginDecrease}>−</button>
                                <span>{verticalMargin}</span>
                              <button className='cust-epub-reader-button-plus-minus' onClick={handleVerticalMarginIncrease}>+</button>
                           </div>
                     </div>
                  </div>    
               
              </div>
            )}
            
          </div>
        </div>
      )}

      <div className={`${!sidebar ? 'full-w' : ''} ${theme === 'dark' ? 'dark-theme' : 'light-theme'} reader-content`} style={{ position: 'relative' }}>
        {/* <div className='test-location'> Curretpage : {page}</div> */}

        <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} cust-bookmark-timer`}>
          {/* Bookmark button */}
          <button className="cust-epub-button-bookmark" onClick={handleAddBookmark}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 21l-7-5l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>

          {/* Timer button */}
          <button className="cust-epub-button-timer" onClick={() => setIsTimerVisible(!isTimerVisible)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="m20.145 8.27l1.563-1.563l-1.414-1.414L18.586 7c-1.05-.63-2.274-1-3.586-1c-3.859 0-7 3.14-7 7s3.141 7 7 7s7-3.14 7-7a6.97 6.97 0 0 0-1.855-4.73M15 18c-2.757 0-5-2.243-5-5s2.243-5 5-5s5 2.243 5 5s-2.243 5-5 5" />
              <path fill="currentColor" d="M14 10h2v4h-2zm-1-7h4v2h-4zM3 8h4v2H3zm0 8h4v2H3zm-1-4h3.99v2H2z" />
            </svg>
          </button>
        </div>

        {/* Timer Modal */}
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

        
         {/* Time Up Notification */}
        {isTimeUp && (
          <div className="time-up-notification">
            <p>Time's up!</p>
            <button onClick={closeNotification}>Close</button>
          </div>
        )}
        {/*  render a pop-up with the options when the user selects text */}
        {showPopup && selectedText && (
          <div
            className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} selection-popup`}
            style={{
              position: 'absolute',
              top: `${Math.min(
                selectionPosition.y + window.scrollY,
                window.innerHeight - 220
              )}px`, // Prevent overflow
              left: `${Math.min(
                selectionPosition.x + window.scrollX,
                window.innerWidth - 360
              )}px`, // Prevent overflow
              background: '#fff',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              width: 'auto',
              maxWidth: '350px',
              minWidth: '250px',
            }}
          >
            {/* Close Button */}
            <button className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} select-modal-popup-button-text-selected-close-btn`}
              onClick={() => setShowPopup(false)} // Hide popup when clicked 
              >
              ✕
            </button>
            <br />
            <br />
            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} select-modal-popup-button-text`}
                   onClick={() => { 
                    setRenderSelection_2(selectedText!.cfiRange); 
                    setSelectedText(null);
                    setShowPopup(false);
                    
                }}
              >
                Add to Note
              </button>

              <a className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} select-modal-popup-button-text`}
                href="https://www.oxfordlearnersdictionaries.com/definition/english/fact?q=fact"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign:'center',
                }}
              >
                Open Dictionary
              </a>

              <button className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} select-modal-popup-button-text`}
                onClick={handleTextToSpeech}
              >
                Text to Speech
              </button>
            </div>

            {/* Selected Text */}
            {showPopup && (
              <div
              className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} popup select-modal-popup-button-text-selected`}
              >
                {selectedText?.text || 'No text selected'}
              </div>
            )}
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
            <br />
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

      {/* Dictionary Modal */}
      {dictionaryModal && (
        <div className="dictionary-modal-overlay" onClick={() => setShowdictionaryModal(false)}>
        <div className="dictionary-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="dictionary-close-button" onClick={() => setShowdictionaryModal(false)}>dict-close</button>
            <iframe className="ytplayer"  width="100%" height="360" src="https://www.oxfordlearnersdictionaries.com/?igu=1" ></iframe>

          {/* </iframe> */}
          </div>
        </div>
      )}
        {/* Epub Reader */}
        <ReactReader
          url={resourceLink}
          title=""
          location={location}
          theme={theme}
          updatePageContent={updatePageContent}
          locationChanged={(loc) => {
            setLocation(loc);
            Userefrendition.current;
          }}
          epubOptions={{
            flow: scrollMode, //// Dynamically set scroll mode
            manager: 'continuous',
          }}
          readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
          getRendition={(_rendition: Rendition) => {
            setRendition(_rendition);
            applyTheme(_rendition, theme); // Apply default theme
          }}
        />
      </div>
    </div>
  )
}
const darkReaderTheme: IReactReaderStyle = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: 'white',
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: '#ccc',
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: '#000',
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: '#ccc',
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: '#111',
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: '#222',
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: '#fff',
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: 'white',
  },
  container: {
    ...ReactReaderStyle.container,
    background: '#000',
  },
  loadingView: {
    ...ReactReaderStyle.loadingView,
    color: 'white',
  },
}

const lightReaderTheme: IReactReaderStyle = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: 'black',
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: '#555',
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: '#fff',
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: '#000',
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: '#f7f7f7',
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: '#ddd',
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: '#333',
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: 'black',
  },
  container: {
    ...ReactReaderStyle.container,
    background: '#fff',
  },
  loadingView: {
    ...ReactReaderStyle.loadingView,
    color: 'black',
  },
}

export default Selection;