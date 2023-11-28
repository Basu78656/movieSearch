import { useDispatch, useSelector } from "react-redux";
import "./WatchList.css";
import { getWatchListMovies, removeMovie } from "../movie-list/movieSlice";
import { Link } from "react-router-dom";

function WatchList() {
  const movies = useSelector(getWatchListMovies);
  const dispatch = useDispatch();

  return (
    <div className="watchlist-container" style={{ marginTop: "80px" }}>
      {movies.length === 0 ? (
        <h1 className="empty">Your watchlist is empty</h1>
      ) : (
        <div className="main-watchlist">
          <div className="watchlist-items">
            {movies.map((movie) => (
              <div className="watchlist-card" key={movie.id}>
                <Link to={`/moviePreview/${movie.id}`}>
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAsYAAWUbB2YPxq9pECm6rDAjpJlwnUnfKA&usqp=CAU"
                    }
                    alt={movie.name}
                  />
                </Link>
                <p className="movie-name">{movie.name}</p>
                <button
                  className="remove-button"
                  onClick={() => dispatch(removeMovie(movie.id))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchList;
