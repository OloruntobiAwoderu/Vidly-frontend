
import { apiUrl } from "../config.json";
import Axios from "axios";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return Axios.get(apiEndpoint);
}

export function getMovie(movieId) {
  return Axios.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return Axios.put(movieUrl(movie._id), body);
  }

  return Axios.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return Axios.delete(movieUrl(movieId));
}
