import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGY2N2QwNWZiZDVlNWU0NTJmMDYyMzY2NzhiYTgxZSIsInN1YiI6IjY2M2U2ZmM5N2VkNjQzMzI3ZDNjOGI3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._0DZwCItAjk2KhT39sCgNOddg9onEKVfbJAzruGpCao'
    }
  };
  

export const fetchMovies = async() => {
    const response = await axios.get("/trending/movie/day?language=en-US", options)
    return response.data.results
}

export const getMovieById = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
    return response.data;
  };

  export const fetchMoviesName = async (name) => {
    const response = await axios.get(`/search/movie?query=${name}&language=en-US`, options);
    return response.data.results;
  };

  export const fetchMovieReviews = async (reviewId) => {
    const response = await axios.get(`/movie/${reviewId}/reviews`, options);
    return response.data.results;
  };

  export const fetchMovieCast = async (castId) => {
    const response = await axios.get(`/movie/${castId}/credits`, options);
    return response.data.cast;
  };



  