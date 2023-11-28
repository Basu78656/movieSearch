// Define the checkIn function within the component
export const checkIn = (id, watchList) => {
  const watchListClone = [...watchList];
  const isDuplicate = watchListClone.some((item) => item.id === id);
  if (!isDuplicate) {
    watchListClone.push({ id });
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }
  return isDuplicate;
};

export function handleAddWatchList(
  id,
  backdrop_path,
  name,
  dispatch,
  addMovies
) {
  const item = {
    id,
    backdrop_path,
    name,
  };
  dispatch(addMovies(item));

  // Fetch the current watchlist data from local storage
  const watchListData = localStorage.getItem("watchlist");
  let watchList = [];
  if (watchListData) {
    watchList = JSON.parse(watchListData);
  }
  // Call checkIn to update the watchlist and save it to local storage
  checkIn(id, watchList);
}

export function filterData(array, genreIdsToFilter) {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }

  return array.filter((movie) => {
    // Check if any of the genre IDs in genreIdsToFilter is in the movie's genre_ids
    return genreIdsToFilter.some((genreId) =>
      movie.genre_ids.includes(genreId)
    );
  });
}
