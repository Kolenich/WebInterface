import { IAttachment } from 'lib/types';
import { RouteComponentProps } from 'react-router';

export type IProps = RouteComponentProps

export interface IProfile {
  /** Первичный ключ */
  id: number;
  /** Флаг почтовой рассылки */
  mailing: boolean;
  /** Отчество */
  middle_name: string | null;
  /** Телефон */
  phone: string | null;
  /** Аватар */
  avatar: IAttachment | null;
}

export interface IUser {
  /** Первичный ключ */
  id: number;
  /** Дата регистрации */
  date_joined: Date | string;
  /** Дата последнего входа */
  last_login: Date | string;
  /** Электронная почта */
  email: string;
  /** Имя пользователя */
  username: string;
  /** Флаг активности */
  is_active: boolean;
  /** Флаг персонала */
  is_staff: boolean;
  /** Флаг суперпользователя */
  is_superuser: boolean;
  /** Имя */
  first_name: string | null;
  /** Фамилия */
  last_name: string | null;
  /** Профиль */
  profile: IProfile | null;
}
