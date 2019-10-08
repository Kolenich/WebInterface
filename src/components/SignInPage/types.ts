import { INotifications } from 'decorators/notification/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps, INotifications {
}

export interface ILogin {
  /** Электронная почта */
  email: string;
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
