import { apiUrl } from "../config.json";
import Axios from "axios";
import jwtDecode from 'jwt-decode'

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token"

Axios.defaults.headers.common['x-auth-token'] = getJwt();


  export async function login(email, password) {
  const { data: jwt } = await Axios.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}
