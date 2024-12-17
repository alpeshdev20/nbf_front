// slices/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  results: any[];
}

const initialState: SearchState = {
  query: '',
  results: []
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
    }
  }
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
