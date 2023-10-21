import { Link } from "react-router-dom";
import Geners from "../featuers/Geners/Geners";
/*eslint-disable*/
function Container({
  data,
  checkIn,
  dispatch,
  watchList,
  removeMovie,
  handleAddWatchList,
  addMovies,
}) {
  return (
    <div style={{ marginTop: "80px" }}>
      <Geners />
      <div className="grid-movie-container">
        {data?.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/moviePreview/${movie.id}`}>
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
                    : // : `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      "https://via.placeholder.com/400x225.png?text=Image+Not+Found"
                }
                alt={movie.title || movie.name}
                className="movie-image"
              />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title || movie.name}</h2>
                <p className="movie-rating">Rating: {movie.vote_average}/10</p>
              </div>
            </Link>
            <button
              className="add-to-watchlist-button"
              onClick={() =>
                checkIn(movie.id, watchList)
                  ? dispatch(removeMovie(movie.id))
                  : handleAddWatchList(
                      movie.id,
                      movie.backdrop_path,
                      movie.name || movie.title,
                      dispatch,
                      addMovies
                    )
              }
            >
              {checkIn(movie.id, watchList) ? "-" : "+"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Container;
