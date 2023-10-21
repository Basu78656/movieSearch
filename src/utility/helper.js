// Define the checkIn function within the component
export const checkIn = (id, watchList) => {
  const isDuplicate = watchList.some((item) => item.id === id);
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
