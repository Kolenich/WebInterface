import axios, { AxiosInstance } from 'axios';

const CSRF_COOKIE_NAME: string = 'csrftoken';
const CSRF_HEADER_NAME: string = 'X-CSRFToken';

export const session: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  // baseURL: 'http://0.0.0.0/rest',
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});
