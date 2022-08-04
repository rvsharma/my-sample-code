import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
export const API_KEY: any = process.env.REACT_APP_API_KEY;

export const apiCall = axios.create({
  baseURL: BASE_URL,
});

export const HEADER_NO_AUTH = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/json',
  },
});

export const HEADER_NO_AUTH_FILE = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Authorization': 'Basic ',
  },
});

export const apiCallFile = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Authorization': 'Basic ',
  },
});
