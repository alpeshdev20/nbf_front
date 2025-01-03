import { useState, useEffect, useRef } from 'react'
import { ReactReader } from './lib/index'
import { Contents, NavItem, Rendition } from 'epubjs'

import { useSession } from "@/providers/SessionProvider";
import './style.css'
import axios from 'axios'
import { log } from 'console';

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
  const [highlightAnnotations, setHighlightAnnotations] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]); // For Bookmark Functionality

  const [page, setPage] = useState('')
  const [currentPageContent, setcurrentPageContent] = useState<string>('');
  const [Contentdata, setContentdata] = useState(0);

  
  const Userefrendition = useRef<Rendition | undefined>(undefined)
  const toc = useRef<NavItem[]>([])

  const [sidebar, setSidebar] = useState(false)
  const { session } = useSession();

  const userIdMain = session?.user?.user_id;

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
    console.log("fetchHighlights called");

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


  // Function to add selections and highlight text
  useEffect(() => {
    if (rendition) {
      function setRenderSelection(cfiRange: string, contents: Contents) {
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

          // Send the highlight to the API
          handleAddHighlight(selectedText, cfiRange);

          const selection = contents.window.getSelection();
          selection?.removeAllRanges();
        }
      }

      rendition.on('selected', setRenderSelection);
      return () => {
        rendition?.off('selected', setRenderSelection);
      };
    }
  }, [rendition]);

  
      // Add bookmark function
      const handleAddBookmark = () => {

        // const currentLocation = rendition.location; // Get the current reading location

        // // Get the content of the current page using the 'rendition' object
        // const pageText = rendition.getRange(currentLocation.start.cfi).toString();

        // // Log or process the page content
        // console.log("rendition", rendition);
        // // Select the container element that holds the main book text
        // const bookContent = document.querySelector('.reader-content'); // Adjust this selector to match your specific content container
      
        // if (bookContent) {
        //   // Get the text content of the selected container
        //   const pageText = bookContent.innerText;  // Grabs all text inside the book content
      
        //   console.log("pageText", pageText);
      
        //   // If you want to get a snippet of the text, you can limit the length:
        //   const snippet = pageText.length > 100 ? pageText.substring(0, 100) + "..." : pageText;
      
        //   const bookmark = {
        //     cfiRange: location,  // Assuming 'location' tracks the CFI
        //     title: title,
        //     snippet: snippet,  // Include the snippet of the first paragraph or page
        //     timestamp: new Date().toISOString(),
        //   };
      
        //   console.log("bookmark data", bookmark);
        //   return  bookmark;
        //   // Update the bookmarks state
        //   setBookmarks([...bookmarks, bookmark]);
        //   saveBookmarksToStorage(bookmark);  // Save the bookmark in localStorage
      
        //   console.log("bookmark after update", bookmarks);
        // } else {
        //   console.error('No book content found!');
        // }
      };

    // Save bookmarks to localStorage
    const saveBookmarksToStorage = (bookmark: any) => {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      storedBookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
    };

    // Function to navigate to a bookmark
    const navigateToBookmark = (bookmark: any) => {
      if (rendition && bookmark.cfiRange) {
        rendition.display(bookmark.cfiRange).then(() => {
          console.log('Navigated to bookmark');
        });
      }
    };

    // Load bookmarks from localStorage when component mounts
    useEffect(() => {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarks(storedBookmarks);
    }, []);

    //got to bookmark
    const navigateToLocation = (cfiRange :any) => {
      // rendition.display(cfiRange);
      
    };
    //delete bookmark
    const handleDeleteBookmark = (index : any) => {
      const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
      setBookmarks(updatedBookmarks);
      // Optionally update storage
      saveBookmarksToStorage(updatedBookmarks);
    };

      // useEffect to handle the "displayed" event and update content
      useEffect(() => {
        if (rendition) {
          const handleDisplayed = (section: Contents) => {
            console.log("handleDisplayed handleDisplayed2");
            
            try {
              // Access the content of the current page
              const iframeDoc = section.document; // Access the iframe's document
              const bodyText = iframeDoc.body.innerText; // Get all text content
              const bodyHTML = iframeDoc.body.innerHTML; // Get all HTML content
      
              console.log('Current Page Text:', bodyText); // Log the plain text
              console.log('Current Page HTML:', bodyHTML); // Log the HTML content
      
              setPage(bodyText); // Store the page content in state if needed
            } catch (error) {
              console.error('Error fetching current page content:', error);
            }
          };
      
          // Attach the 'displayed' event listener
          rendition.on('displayed', handleDisplayed);
      
          // Clean up the listener on unmount
          return () => {
            rendition.off('displayed', handleDisplayed);
          };
        }
      }, [rendition]);

      const handleDisplayed = (section: Contents) => {
        console.log("handleDisplayed handleDisplayed2");
        
        try {
          // Access the content of the current page
          const iframeDoc = section.document; // Access the iframe's document
          const bodyText = iframeDoc.body.innerText; // Get all text content
          const bodyHTML = iframeDoc.body.innerHTML; // Get all HTML content
  
          console.log('Current Page Text:', bodyText); // Log the plain text
          console.log('Current Page HTML:', bodyHTML); // Log the HTML content
  
          setPage(bodyText); // Store the page content in state if needed
        } catch (error) {
          console.error('Error fetching current page content:', error);
        }
      };

      const updatePageContent = (content: string) => {
        // handleDisplayed(content)
      };
   // Callback function to update the page content
      
          
  return (
    <div className='wrapper-container'>
      <div className="side-icons">
        <br /><br /><br /><br />
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
      </div>

      {sidebar && (
        <div className="sidebar-drawer">
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
                <ul className="selection-list">
                  {selections && selections.map(({ text, cfiRange }, i) => {
                    // Limit the text to the first 20 characters and add "..." if the text is longer
                    const truncatedText = text.length > 20 ? `${text.slice(0, 20)}...` : text;

                    return (
                      <li key={i} className="selection-item" onClick={() => {
                        rendition?.display(cfiRange);
                        setSelectedText({ text, cfiRange }); // Set selected text to show in the sub-sidebar
                        setSidebar(false); // Close the sidebar when a selection is clicked
                      }}>
                        <span>{truncatedText}</span>

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
              <div className="sidebar-search">
                <div className="search-container">
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

                <ul className="search-results">
                  {searchResults.map((result, index) => (
                    <li key={index} onClick={() => handleNavigateToResult(result.cfi)}>
                      {/* Use dangerouslySetInnerHTML to render the HTML content with highlighted text */}
                      <span dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {activeSidebar === 'bookmarks' && (
              <div>
                <ul className="bookmarks-list">
                  {bookmarks.map((bookmark, index) => (
                    <li key={index}>
                      <p className="bookmark-title">{bookmark.title || "Untitled Bookmark"}</p>
                      <div className="bookmark-actions">
                        <button onClick={() => navigateToLocation(bookmark.cfiRange)}>
                          Go to Bookmark
                        </button>
                        <button onClick={() => handleDeleteBookmark(index)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

        <div className={`reader-content ${!sidebar ? 'full-w' : ''}`} style={{ position: 'relative' }}>
          {/* <div className='test-location'> Curretpage : {page}</div> */}
          {/* Add the Bookmark button */}
          <button className="cust-epub-button-bookmark" onClick={handleAddBookmark}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 1h10a1 1 0 0 1 1 1v20l-5-5l-5 5V2a1 1 0 0 1 1-1z" />
            </svg>
            Bookmark
          </button>

          {/* Epub Reader */}
          <ReactReader
            url={resourceLink}
            title=""
            location={location}
            updatePageContent={updatePageContent}
            locationChanged={(loc) => {
              setLocation(loc);
              Userefrendition.current;
            }}
            getRendition={(_rendition: Rendition) => {
              setRendition(_rendition);
            }}
          />
        </div>
    </div>
  )
}

export default Selection;