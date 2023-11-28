import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllMovieData } from "../../services/apiMovies";
import Loading from "../../ui/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, getWatchListMovies, removeMovie } from "./movieSlice";
import { checkIn, filterData, handleAddWatchList } from "../../utility/helper";
import Container from "../../ui/Container";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { useCallback } from "react";

function Romantic() {
  const { results: initialMovies } = useLoaderData();
  const [movieData, setMovieData] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [data, query] = useOutletContext();
  const dispatch = useDispatch();
  const watchList = useSelector(getWatchListMovies);
  const loadingRef = useRef(false);
  const [lastLoadedMovieId, setLastLoadedMovieId] = useState(null);
  const [noMoreMovies, setNoMoreMovies] = useState(false);
  const navigation = useNavigation();

  const fetchMovies = useCallback(async () => {
    try {
      if (loadingRef.current || noMoreMovies) return;

      loadingRef.current = true;

      const response = await getAllMovieData(page);

      if (query.length > 2) {
        setMovieData(data.results);
        setPage(1);
      } else {
        // Filter and append data, skipping duplicates
        const filteredData = response.results.filter(
          (movie) => movie.id !== lastLoadedMovieId
        );

        if (filteredData.length === 0) {
          // No more movies to load
          setNoMoreMovies(true);
        } else {
          // Update last loaded movie ID
          const filteredDataByGener = filterData(
            filteredData,
            [10749, 10751, 10402]
          );
          setLastLoadedMovieId(
            filteredDataByGener[filteredDataByGener.length - 1].id
          );
          setMovieData((prevMovies) => [
            ...(prevMovies || []),
            ...filteredDataByGener,
          ]);

          setPage((prevPage) => prevPage + 1);
        }
      }

      loadingRef.current = false;
    } catch (error) {
      console.error(error);
      loadingRef.current = false;
    }
  }, [page, query, data.results, lastLoadedMovieId, noMoreMovies]);

  useEffect(() => {
    fetchMovies();
  }, [page, query, fetchMovies]);

  if (!movieData)
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

  if (navigation.state === "loading") return <Loading />;

  return (
    <>
      <InfiniteScroll
        dataLength={movieData.length}
        next={fetchMovies}
        hasMore={!noMoreMovies}
        loader={<Loading />} // You can customize the loader component
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Container
          data={movieData}
          checkIn={checkIn}
          dispatch={dispatch}
          watchList={watchList}
          removeMovie={removeMovie}
          handleAddWatchList={handleAddWatchList}
          addMovies={addMovies}
        />
      </InfiniteScroll>
      {noMoreMovies && <h1>End</h1>}
    </>
  );
}

export async function loader() {
  const movies = await getAllMovieData();
  return movies;
}

export default Romantic;
