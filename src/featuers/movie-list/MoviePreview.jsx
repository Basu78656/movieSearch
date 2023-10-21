import { useState, useEffect } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import { getCast, getMovieById } from "../../services/apiMovies";
import Loading from "../../ui/Loading";
import "./Movie.css";
import { useDispatch, useSelector } from "react-redux";
import { handleAddWatchList, checkIn } from "../../utility/helper";
import { addMovies, getWatchListMovies, removeMovie } from "./movieSlice";

/*eslint-disable*/
const MoviePreview = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const watchlist = useSelector(getWatchListMovies);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieById(id);
        setMovieData(data);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, [id]);
  if (!movieData) {
    return <Loading />;
  }
  const data = useLoaderData();
  console.log(data);
  const poster_path =
    movieData.belongs_to_collection?.poster_path || movieData.poster_path;
  let full_path = `https://image.tmdb.org/t/p/w500${poster_path}`;
  return (
    <div className="movie-container" style={{ marginTop: "100px" }}>
      <div className="movie-bodys">
        <div className="movie-posters">
          <img src={full_path} alt="Movie Poster" />
        </div>
        <div className="movie-infos">
          <h1>{movieData.original_title}</h1>
          <p className="gener">
            Genres: {movieData?.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className="gener">
            Language :{" "}
            {movieData?.spoken_languages?.map((lang) => lang.name).join(" ")}
          </p>
          <p className="release_date">Release Date: {movieData.release_date}</p>
          <p className="overview">Overview : {movieData.overview}</p>
          <p className="runtime">Runtime: {movieData.runtime} minutes</p>
          <p className="rating">
            IMDB RATING:{" "}
            <span className="p_span">{movieData.vote_average}</span>
          </p>
          <div className="movie_infos_button">
            <button
              onClick={() =>
                checkIn(movieData.id, watchlist)
                  ? dispatch(removeMovie(movieData.id))
                  : handleAddWatchList(
                      movieData.id,
                      full_path,
                      movieData.original_title,
                      dispatch,
                      addMovies
                    )
              }
            >
              {checkIn(movieData.id, watchlist) ? "Remove" : "Add to Watchlist"}
            </button>
            {/* <button>Watch Trailer</button> */}
          </div>
        </div>
      </div>
      {/* MAIN */}
      <h1 className="cast">CAST</h1>
      <div className="main_card_container">
        <div className="card_container">
          {data?.cast?.map((profile) => (
            <div className="profile_card" key={profile.id}>
              <img
                src={
                  profile.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile.profile_path}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAsYAAWUbB2YPxq9pECm6rDAjpJlwnUnfKA&usqp=CAU"
                }
                alt="jl"
              />
              <div className="intro">
                <h2>{profile.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function loader({ params }) {
  const data = await getCast(params.id);
  return data;
}

export default MoviePreview;

// handleAddWatchList();
