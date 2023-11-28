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
      const isDuplicate = state.watchList.some(
        (item) => item.id === newItem.id
      );
      if (!isDuplicate) {
        // console.log(state.watchList);
        state.watchList.push(newItem);
      }
    },
    updateWatchlist: (state, action) => {
      state.watchList = action.payload;
    },
    removeMovie(state, action) {
      state.watchList = state.watchList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addMovies, removeMovie, updateWatchlist } = movieSlice.actions;
export const getWatchListMovies = (state) => state.movie?.watchList;

export default movieSlice.reducer;
