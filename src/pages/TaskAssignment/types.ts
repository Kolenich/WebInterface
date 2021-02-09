import { IAttachment } from 'lib/types';
import { ReactText } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps {
}

export interface ITask {
  /** Ключ объекта в БД */
  readonly id?: number;
  /** Краткое описание */
  summary: string;
  /** Полное описание */
  description: string;
  /** Кому назначено */
  assigned_to: ReactText | null;
  /** Срок исполнения */
  dead_line: string | null | Date;
  /** Комментарий */
  comment: string;
  /** Объект вложения */
  attachment: IAttachment | null;
}

export interface IUserAssigner {
  /** Первичный ключ пользователя */
  pk: number;
  /** Фамилия пользователя */
  last_name: string;
  /** Имя пользователя */
  first_name: string;
}
