import axios from 'axios';
import { getBaseUrl } from './utils';

// Настройка функционала прерывания запроса
const { CancelToken } = axios;
export const source = CancelToken.source();

const session = axios.create({
  baseURL: getBaseUrl(process.env.NODE_ENV === 'production'),
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default session;
