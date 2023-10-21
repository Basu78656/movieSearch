import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./featuers/movie-list/movieSlice";
const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;
