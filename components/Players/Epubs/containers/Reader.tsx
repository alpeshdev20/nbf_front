	import React, { useState, useRef, useEffect } from 'react'
	import { useSelector, useDispatch } from 'react-redux'
	import { Provider } from 'react-redux'
	import { ReactEpubViewer } from 'react-epub-viewer'

	import { createSlice, PayloadAction } from '@reduxjs/toolkit';

	// .
	import Header from './Header'
	import Footer from './Footer'
	import Nav from './menu/Nav'
	import Option from './menu/Option'
	// Import Search Component
	import Search from './menu/Search';
	import {onClickDirection} from './menu/Option'
	import Learning from './menu/Note'
	import ContextMenu from './commons/ContextMenu'
	import Snackbar from './commons/Snackbar'
	// components          
	import ViewerWrapper from '../components/commons/ViewerWrapper'
	import LoadingView from '../components/LoadingView'
	// slices
	import store from '../slices'
	import { updateBook, updateCurrentPage, updateToc } from '../slices/book'
	// hooks
	import useMenu from '../lib/hooks/useMenu'
	import useHighlight from '../lib/hooks/useHighlight'
	// styles
	import '../lib/styles/readerStyle.css'
	import viewerLayout from '../lib/styles/viewerLayout'
	// types
	import { RootState } from '../slices'
	import { setSearchQuery, setSearchResults } from '../slices/searchSlice';

	import { ViewerRef } from '../types'
	import Book, { BookStyle, BookOption } from '../types/book'
	import Page from '../types/page'
	import Toc from '../types/toc'


	const Reader = ({ url, loadingView ,book_id , updateUserAndBookStats }: Props) => {

		// Inside Reader Component
			
		const dispatch = useDispatch();
		const currentLocation = useSelector<RootState, Page>(state => state.book.currentLocation);
		const book_id_main = book_id;
		const viewerRef = useRef<ViewerRef | any>(null);
		const navRef = useRef<HTMLDivElement | null>(null);
		const optionRef = useRef<HTMLDivElement | null>(null);
		const learningRef = useRef<HTMLDivElement | null>(null);
		const searchRef = useRef<HTMLDivElement | null>(null); // Ref for Search Sidebar

		const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);
		const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

		// console.log("book_id in Reader component:", book_id);
		// const searchQuery = useSelector((state: RootState) => state.search.query);

	 const handleCopyEvent = (event: ClipboardEvent) => {
		console.log("console handleCopyEvent called");
		
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
			console.log("users state update");
			
			const interval = setInterval(() => {
			  updateUserAndBookStats("5000");
			}, 5000);
		
			return () => {
			  clearInterval(interval);
			};
		  }, []);
 

		const [isContextMenu, setIsContextMenu] = useState<boolean>(false);
		
		const [bookStyle, setBookStyle] = useState<BookStyle>({
		fontFamily: 'Origin',
		fontSize: 18,
		lineHeight: 1.4,
		marginHorizontal: 15,
		marginVertical: 5
	});

	// Toggle search sidebar
	//   const onSearchToggle = () => setIsSearchOpen(prev => !prev); 

	
	const [bookOption, setBookOption] = useState<BookOption>({
		flow: "scrolled-doc",
		resizeOnOrientationChange: false,
		spread: "none"
	});
	const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(false);
	const [viewType, setViewType] = useState<ViewType>({
		active: true,
		spread: true
	});
	
		// Toggle State for Components

		const [navControl, onNavToggle] = useMenu(navRef, 300.);
		const [optionControl, onOptionToggle, emitEvent] = useMenu(optionRef, 300);
		const [learningControl, onLearningToggle] = useMenu(learningRef, 300);
		const [searchControl, onSearchToggle] = useMenu(searchRef, 300); // Search Toggle

		const { 
			selection, 
			onSelection, 
			onClickHighlight,
			onAddHighlight,
			onRemoveHighlight,
			onUpdateHighlight
		} = useHighlight(viewerRef, setIsContextMenu, bookStyle, bookOption.flow ,book_id);

		/**
	 * Set Search Query and Perform Search
	 */

		useEffect(() => {
			// Trigger a reflow by changing a state or resizing the window
			window.dispatchEvent(new Event('resize'));
		}, []);

		/**
		 * Change Epub book information
		 * @param book Epub Book Info
		 */
		const onBookInfoChange = (book: Book) => {
			// Dispatch the action to update the book information
			dispatch(updateBook(book));
			onClickDirection(
				'Horizontal', // Direction you want to pass (can also be 'Vertical')
				setIsScrollHorizontal, // The state setter for scroll direction
				setViewType, // The state setter for view type
				bookOption, // The current book options
				onBookOptionChange // The function to update book options
			);
		};
	/**
		 * Change Epub location
		 * @param loc epubCFI or href
		 */
		const onLocationChange = (loc: string) => {
			if (!viewerRef.current) return;
			viewerRef.current.setLocation(loc);
		}	

		/**
		 * Move page
		 * @param type Direction
		 */
		const onPageMove = (type: "PREV" | "NEXT") => {
			const node = viewerRef.current;
		
			// Ensure the viewer is loaded and the methods are available
			if (!node || !node.prevPage || !node.nextPage) return;
		
			// Move the page
			if (type === "PREV") node.prevPage();
			if (type === "NEXT") node.nextPage();
		};
		


		/**
		 * Set toc
		 * @param toc Table of Epub contents
		 */
		const onTocChange = (toc: Toc[]) => dispatch(updateToc(toc));

		/** 
		 * Set Epub viewer styles
		 * @param bokkStyle_ viewer style
		 */
		const onBookStyleChange = (bookStyle_: BookStyle) => setBookStyle(bookStyle_);

		/** 
		 * Set Epub viewer options
		 * @param bookOption_ viewer option
		 */
		const onBookOptionChange = (bookOption_: BookOption) => setBookOption(bookOption_);

		/**
		 * Change current page
		 * @param page Epub page
		 */
		// Change current page and check if it's the last one
		const onPageChange = (page: Page) => {
			dispatch(updateCurrentPage(page));
		
			// Check if the current page is the last one
			if (page.currentPage === page.totalPage) {
			setAllPagesLoaded(true);
			}
		};
		/** 
		 * ContextMenu on 
		 * @param cfiRange CfiRange
		 */
		const onContextMenu = (cfiRange: string) => {
			const result = onSelection(cfiRange);
			setIsContextMenu(result);
		}

		/** ContextMenu off */
		const onContextmMenuRemove = () => setIsContextMenu(false);

		// Function to handle search action
		// const handleSearch = () => {
		// 	const query = searchQuery.trim();
		// 	if (!query) return;
		  
		// 	if (viewerRef.current) {
		// 	  // Call a method to search within the viewer
		// 	  viewerRef.current.searchText(query);  // Implement this function inside your viewer
		  
		// 	  // Assuming `searchText` returns an array of results
		// 	  const results = viewerRef.current.getSearchResults(query); // Replace this with your actual method
		// 	  dispatch(setSearchResults(results)); // Store the results globally
		// 	}
		//   };
		
		//   useEffect(() => {
		// 	if (viewerRef.current && searchQuery) {
		// 	  viewerRef.current.searchText(searchQuery);  // Perform the search on all pages
		// 	}
		//   }, [searchQuery, viewerRef]);  // Trigger search whenever the query changes
		
	return (<>
		<ViewerWrapper>
		<Header 
					onNavToggle={onNavToggle}
					onOptionToggle={onOptionToggle}
					onLearningToggle={onLearningToggle}
					onSearchToggle={onSearchToggle}

				/>

		<ReactEpubViewer 
					ref={viewerRef}		
					url={url}
					viewerLayout={viewerLayout}
					viewerStyle={bookStyle}
					viewerOption={bookOption}
					onBookInfoChange={onBookInfoChange}
					onPageChange={onPageChange}
					onTocChange={onTocChange}
					onSelection={onContextMenu}
					loadingView={loadingView || <LoadingView />}


				/>

				<Footer 
					title={currentLocation.chapterName}
					nowPage={currentLocation.currentPage}
					totalPage={currentLocation.totalPage}
					onPageMove={onPageMove}
				/>
		</ViewerWrapper>

		<Nav
				control={navControl}
				onToggle={onNavToggle}
				onLocation={onLocationChange}
				ref={navRef}
			/>
		
		<Option 
				control={optionControl}
				bookStyle={bookStyle}
				bookOption={bookOption}
				bookFlow={bookOption.flow}
				onToggle={onOptionToggle} 
				emitEvent={emitEvent}
				onBookStyleChange={onBookStyleChange}
				onBookOptionChange={onBookOptionChange}
				ref={optionRef}
			/>

			<Learning 
				control={learningControl}
				onToggle={onLearningToggle}
				onClickHighlight={onClickHighlight}
				emitEvent={emitEvent}
				viewerRef={viewerRef}
				ref={learningRef}
				
			/>
			{/* Search Sidebar */}
			{/* <Search
			control={searchControl}
			viewerRef={viewerRef}
			onToggle={onSearchToggle}
			ref={searchRef}
			/> */}

			{/* <Search
			control={searchControl}
			viewerRef={viewerRef}
			onToggle={onSearchToggle}
			searchQuery={searchQuery}
			setSearchQuery={setSearchQuery}
			onSearch={handleSearch}
			/> */}


			<ContextMenu
				active={isContextMenu}
				viewerRef={viewerRef}
				selection={selection}
				onAddHighlight={onAddHighlight}
				onRemoveHighlight={onRemoveHighlight}
				onUpdateHighlight={onUpdateHighlight}
				onContextmMenuRemove={onContextmMenuRemove}
			/>

			<Snackbar />
	</>);
	}

	const ReaderWrapper = ({ url, loadingView ,book_id ,updateUserAndBookStats }: Props) => {
		return (
			<Provider store={store}>
				<Reader url={url}
				book_id={book_id}
				loadingView={loadingView}
				updateUserAndBookStats={updateUserAndBookStats}
				/>
			</Provider>
		);
	}

	interface Props {
		url: string;
		loadingView?: React.ReactNode;
		book_id :any;
		updateUserAndBookStats: (time: string) => void;

	}

	type ViewType = {
		active: boolean,
		spread: boolean
	}

	
	export default ReaderWrapper