import axios from 'axios';
import AuthToken from 'drf-auth';

const auth = new AuthToken();

// Настройка функционала прерывания запроса
const { CancelToken } = axios;
export const source = CancelToken.source();

export const USERS_APP = 'users-api';
export const TASKS_APP = 'tasks-api';

export const { session } = auth;
export default auth;
