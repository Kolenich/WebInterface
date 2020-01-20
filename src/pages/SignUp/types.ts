import { INotifications } from 'decorators/withDialog/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps, INotifications {
}

export interface IAccount {
  /** Имя */
  first_name: string;
  /** Фамилия */
  last_name: string;
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
  /** Флаг имени для почты */
  first_name?: boolean;
  /** Флаг фамилии для почты */
  last_name?: boolean;
  /** Флаг пароля для почты */
  password?: boolean;

  [index: string]: boolean | undefined;
}
