import { useState, useEffect } from 'react'
import { ReactReader } from './lib/index'
import type { Contents, Rendition } from 'epubjs'

import { useSession } from "@/providers/SessionProvider";
import './style.css'
import axios from 'axios'

type ITextSelection = {
  text: string
  cfiRange: string
}

interface SelectionProps {
  resourceLink: string; // Change this to match the prop being passed
  title: string;
  book_id: string;
}

export const Selection: React.FC<SelectionProps> = ({ resourceLink, title, book_id }) => {

  const [selections, setSelections] = useState<ITextSelection[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('') // For Search Functionality
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined)
  const [location, setLocation] = useState<string | number>(0)
  const [activeSidebar, setActiveSidebar] = useState<string>('selections') // For managing which sidebar is open
  const [selectedText, setSelectedText] = useState<ITextSelection | null>(null)

  const [sidebar, setSidebar] = useState(false)
  const { session } = useSession();

  const userIdMain = session?.user?.user_id;


  // fetch and Dynamic Highlight
  const fetchHighlights = async () => {
    console.log("fetchHighlights called");

    try {
      const response = await axios.post(`${process.env.API_URL}highlights-epub/list`, {
        book_id,
        user_id: userIdMain,
      });

      if (response.data && response.data.message) {
        console.log("Inside responce if");

        response.data.message.forEach((highlightData: any) => {
          console.log("response.data.message if");

          if (rendition) { // Ensure rendition is defined before accessing it
            console.log("rendition if");

            console.log("Rendition", rendition);

            rendition.annotations.add(
              'highlight',
              highlightData.cfi_range,
              {},
              (e: MouseEvent) => console.log('Click on existing highlight:', highlightData.cfi_range, e),
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
              (e: MouseEvent) => console.log('Click on new highlight:', cfiRange, e),
              'hl',
              { fill: 'yellow', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
            );

            setSelections((list) =>
              list.concat({
                text: selectedText,
                cfiRange,
              })
            );

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

      console.log('Highlight added successfully:', response.data);
    } catch (error) {
      console.error('Error adding highlight:', error);
    }
  };

  const handleRemoveHighlight = async (cfiRange: string) => {
    try {

      console.log("remove api is called");
      
      // API call to remove the highlight on the server
      // const response = await axios.post(
      //   `${process.env.API_URL}highlights-epub/remove`,
      //   {
      //     cfiRange,
      //     book_id,
      //     userIdMain,
      //   }
      // );

      // if (response.data.success) {
      //   console.log('Highlight removed successfully:', cfiRange);

        // Remove the highlight from the EPUB rendering
        if (rendition) {
          rendition.annotations.remove(cfiRange, 'highlight');
        }

        // Update the selections state
        setSelections((prevSelections) =>
          prevSelections.filter((selection) => selection.cfiRange !== cfiRange)
        );
      // } else {
      //   console.error('Failed to remove highlight:', response.data.message);
      // }
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
            (e: MouseEvent) => console.log('click on selection', cfiRange, e),
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
  // Handle Search
  const filteredSelections = selections.filter((selection) =>
    selection.text.toLowerCase().includes(searchQuery.toLowerCase())
  )


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
            <div>Highlights</div>
            <button onClick={() => setSidebar(false)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" /></svg></button>
          </div>
          <hr />
          <br />
          <div>
            {/* list highlight  in sidebar  */}
            {activeSidebar === 'selections' && (
              <div>
                <ul className="selection-list">
                  {filteredSelections.map(({ text, cfiRange }, i) => {
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
                <h2>Search Results</h2>
                {/* <ul>
                    {filteredSelections.map((selection, index) => (
                      <li key={index}>{selection.text}</li>
                    ))}
                  </ul> */}
              </div>
            )}
            {activeSidebar === 'bookmarks' && (
              <div>
                <h2>Bookmarks</h2>
                <p>No bookmarks yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`reader-content ${!sidebar ? 'full-w' : ''}`}>
        <ReactReader
          url={resourceLink}
          title=""
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          getRendition={(_rendition: Rendition) => {
            setRendition(_rendition)
            console.log('Rendition initialized:', _rendition);

          }}
        />

      </div>
    </div>
  )
}

export default Selection;