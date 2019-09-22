import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { OutgoingHttpHeaders } from 'http';
import { getBaseUrl } from './utils';

const xsrfCookieName: string = 'csrftoken';
const xsrfHeaderName: string = 'X-CSRFToken';

const baseURL: string = getBaseUrl();

const timeout: number = 1000;

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

export const USERS_APP: string = 'users_api';
export const TASKS_APP: string = 'tasks_api';
