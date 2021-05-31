import { RouteComponentProps } from 'react-router';

export type IProps = RouteComponentProps;

export interface ILogin {
  /** Имя пользователя */
  username: string;
  /** Пароль */
  password: string;
}

export interface IStatus {
  /** Флаг ошибки */
  error: boolean;
  /** Флаг загрузки */
  loading: boolean;
  /** Флаг "Запомнить" */
  remember: boolean;
}
