/*eslint-disable*/
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzVmODU1ODFjY2E0MGY3OTIxMDViY2I2ZTkyMWIwMCIsInN1YiI6IjY1MDZlYjU3Mzk0YTg3MDBjNWJkYzY0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Hp2MJxS1VnfuSW5xtdluobo3RZ9BF2u06lMVJarD8k",
  },
};

const apiKey = "fc5f85581cca40f792105bcb6e921b00";
export const getAllMovieData = async (page) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchedMovie = async (query) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&api_key=${apiKey}`
      // 'https://api.themoviedb.org/3/search/multi?query=Kgf&include_adult=false&language=en-US&page=1'
      // `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en&api_key=${apiKey}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCast = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTopRated = async (page) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// export const getAllMovieData = async () => {
//   let page = 1; // Initialize 'page' to 1
//   const allData = [];

//   try {
//     while (true) {
//       const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=${page}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       // Check if there is data on the current page
//       if (data.results.length === 0) {
//         break; // No more data, exit the loop
//       }

//       // Append the data from the current page to the allData array
//       allData.push(...data.results);

//       // Move on to the next page
//       page++;
//     }

//     return allData;
//   } catch (error) {
//     console.error(error);
//   }
// };
