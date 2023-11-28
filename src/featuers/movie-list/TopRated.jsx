import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { getTopRated } from "../../services/apiMovies";
import Loading from "../../ui/Loading";
import Container from "../../ui/Container";
import { checkIn, handleAddWatchList } from "../../utility/helper";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, getWatchListMovies, removeMovie } from "./movieSlice";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";

function TopRated() {
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
        const response = await getTopRated(state);
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

export default TopRated;

export async function loader() {
  const data = await getTopRated();
  return data;
}

// MOVIE
// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37
