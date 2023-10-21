import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Movie from "../src/featuers/movie-list/Movie";
import MoviePreview from "./featuers/movie-list/MoviePreview";
import WatchList from "./featuers/watch-list/WatchList";
import TopRated from "./featuers/movie-list/TopRated";
import Romantic from "./featuers/movie-list/Romantic";
import ThrillerAndCrime from "./featuers/movie-list/ThrillerAndCrime";

import { loader as movieLoader } from "../src/featuers/movie-list/Movie";
import { loader as movieCastLoader } from "../src/featuers/movie-list/MoviePreview";
import { loader as topRatedLoader } from "./featuers/movie-list/TopRated";
import ActionMovies, {
  loader as actionLoader,
} from "./featuers/movie-list/ActionMovies";
import { loader as rLoader } from "./featuers/movie-list/TopRated";
import { loader as tcLoader } from "./featuers/movie-list/ThrillerAndCrime";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Movie />,
        loader: movieLoader,
      },
      {
        path: "/topRated",
        element: <TopRated />,
        loader: topRatedLoader,
      },
      {
        path: "/moviePreview/:id",
        element: <MoviePreview />,
        loader: movieCastLoader,
      },
      {
        path: "/watchList",
        element: <WatchList />,
      },
      {
        path: "/actionMovies",
        element: <ActionMovies />,
        loader: actionLoader,
      },
      {
        path: "/romanticMovies",
        element: <Romantic />,
        loader: rLoader,
      },
      {
        path: "/thrillerCrime",
        element: <ThrillerAndCrime />,
        loader: tcLoader,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
