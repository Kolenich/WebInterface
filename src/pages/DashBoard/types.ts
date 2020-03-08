import { INotifications } from 'components/DialogAlert/types';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps, INotifications {
}

export interface IProfileUser {
  /** Имя пользователя */
  first_name: string;
  /** Фамилия пользователя */
  last_name: string;
  /** Электронная почта пользователя */
  email: string;
}
