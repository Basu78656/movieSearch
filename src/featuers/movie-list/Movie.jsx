import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllMovieData } from "../../services/apiMovies";
import Pagination from "../pagination/Pagination";
import Loading from "../../ui/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, getWatchListMovies, removeMovie } from "./movieSlice";
import { checkIn, handleAddWatchList } from "../../utility/helper";
import Container from "../../ui/Container";

function Movie() {
  const { results: movies } = useLoaderData();
  const [movieData, setMovieData] = useState(movies);
  const [state, setState] = useState(1);
  const [data, query] = useOutletContext();
  const dispatch = useDispatch();
  const watchList = useSelector(getWatchListMovies);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllMovieData(state);
        if (query.length > 2) {
          setMovieData(data.results);
          setState(1);
        } else setMovieData(response.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [state, data.results, query.length]);

  if (movieData?.length === 0)
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "100px",
          fontSize: "1 rem",
          color: " #666",
        }}
      >
        No movies found
      </h1>
    );
  return (
    <>
      {navigation.state === "loading" ? (
        <Loading />
      ) : (
        <>
          <Container
            data={movieData}
            checkIn={checkIn}
            dispatch={dispatch}
            watchList={watchList}
            removeMovie={removeMovie}
            handleAddWatchList={handleAddWatchList}
            addMovies={addMovies}
          />
          {movieData?.length >= 20 ? (
            <Pagination setState={setState} state={state} />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

export async function loader() {
  try {
    const movies = await getAllMovieData();
    return movies;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null; // Return null or an error response if needed
  }
}

export default Movie;
