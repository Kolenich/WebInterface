import { RouteComponentProps } from 'react-router';
import { IProfile } from '../AccountDetail/types';

export interface IProps extends RouteComponentProps {
}

export interface IProfileUser {
  /** Электронная почта пользователя */
  email: string;
  /** Псевдоним */
  username: string;
  /** Имя */
  first_name: string | null;
  /** Фамилия */
  last_name: string | null;
  /** Аватар пользователя */
  profile: IProfile | null;
}
