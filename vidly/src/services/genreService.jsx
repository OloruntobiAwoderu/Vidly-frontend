
import axios from "axios"
import config from '../config.json'


export const getGenres = () => {
   return axios.get(`${config.apiUrl}/genres`)
}
