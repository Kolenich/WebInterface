import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { OutgoingHttpHeaders } from 'http';
import { getBaseUrl } from './utils';

// Настройка функционала прерывания запроса
const { CancelToken } = axios;
export const source = CancelToken.source();

const xsrfCookieName = 'csrftoken';
const xsrfHeaderName = 'X-CSRFToken';

const baseURL = getBaseUrl(process.env.NODE_ENV === 'production');

const timeout = 10000;

const headers: OutgoingHttpHeaders = {
  'Content-Type': 'application/json',
};

const requestConfig: AxiosRequestConfig = {
  baseURL,
  xsrfCookieName,
  xsrfHeaderName,
  timeout,
  headers,
};

export const session: AxiosInstance = axios.create(requestConfig);

export const USERS_APP = 'users_api';
export const TASKS_APP = 'tasks_api';
