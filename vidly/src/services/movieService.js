
import Axios from 'axios';
import config from "../config.json"

export const getMovies = () => {
    return Axios.get(`${config.apiUrl}/movies`)
}
 


export const deleteMovie = (movieId) => {
    return Axios.delete(`${config.apiUrl}/movies/${movieId}`)
}
 
