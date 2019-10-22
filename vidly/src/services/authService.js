
import { apiUrl } from "../config.json";
import Axios from "axios";

const apiEndpoint = apiUrl + "/auth";

export function login(email, password) {
    return Axios.post(apiEndpoint, {email, password})
}
