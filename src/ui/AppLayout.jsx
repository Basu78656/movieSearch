import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getSearchedMovie } from "../services/apiMovies";
import { useDispatch } from "react-redux";
// import { moviesQuery, searchedMovies } from "../featuers/movie-list/movieSlice";

function AppLayout() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSearchedMovie(query);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [query, dispatch]);
  return (
    <div className="app">
      <div className="main">
        <nav className="nav">
          <Link className="logo" to={"/"}>
            MovieSearch
          </Link>
          <div className="search">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </nav>
        <main>
          <Outlet context={[data, query]} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
