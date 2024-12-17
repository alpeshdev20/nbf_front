import React, { forwardRef, useState, ChangeEvent } from 'react';
import Wrapper from '../../components/sideMenu/Wrapper';
import { MenuControl } from '../../lib/hooks/useMenu';

interface Props {
    control: MenuControl;
    onToggle: () => void;
    viewerRef: any;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
  }

  const Search = forwardRef<HTMLDivElement, Props>(({
    control,
    onToggle,
    viewerRef,
    searchQuery,  // Access the search query passed as a prop
    setSearchQuery,  // Access the function to set search query passed as a prop
    onSearch,  // Access the search handler passed as a prop
  }, ref) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearchClick = () => {
      if (viewerRef.current) {
        // Perform search with the query
        const text = searchQuery;
        if (text) {
          viewerRef.current.searchText(text); // Implement searchText function yourself
        }
      }
    };
  
    return (
      <Wrapper
        title="Search"
        show={control.open}
        onClose={onToggle}
        ref={ref}
      >
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}  // Bind the search query to the input
            onChange={handleInputChange}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '14px',
              width: '100%',
            }}
          />
          <button
            onClick={handleSearchClick}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Search
          </button>
        </div>
      </Wrapper>
    );
  });

export default Search;
