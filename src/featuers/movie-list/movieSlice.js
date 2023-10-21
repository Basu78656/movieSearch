import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchList: [],
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovies(state, action) {
      const newItem = action.payload;

      // Check if the item with the same ID already exists in the watchList
      const isDuplicate = state.watchList.some(
        (item) => item.id === newItem.id
      );
      if (!isDuplicate) {
        state.watchList.push(newItem);
      }
    },
    removeMovie(state, action) {
      state.watchList = state.watchList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addMovies, removeMovie } = movieSlice.actions;
export const getWatchListMovies = (state) => state.movie?.watchList;
export default movieSlice.reducer;
