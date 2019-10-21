import { apiUrl } from "../config.json";
import Axios from "axios";

const apiEndpoint = apiUrl + '/users';

export function register(user){
  return  Axios.post(apiEndpoint, {
        email:user.username,
        password: user.password,
        name: user.name
    })
}