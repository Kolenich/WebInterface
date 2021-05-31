import { RouteComponentProps } from 'react-router';

export type IProps = RouteComponentProps;

export interface IAccount {
  /** Имя */
  first_name: string;
  /** Фамилия */
  last_name: string;
  /** Отчество */
  middle_name?: string;
  /** Имя пользователя */
  username: string;
  /** Электронная почта */
  email: string;
  /** Пароль */
  password: string;
  /** Рассылка на почту */
  mailing: boolean;
}

export interface IErrors {
  /** Флаг ошибки для почты */
  email?: boolean;
  /** Флаг ошибки для имени */
  first_name?: boolean;
  /** Флаг ошибки для имени пользователя */
  username?: boolean;
  /** Флаг ошибки для фамилии */
  last_name?: boolean;
  /** Флаг ошибки для пароля */
  password?: boolean;

  [index: string]: boolean | undefined;
}
