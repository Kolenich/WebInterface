import { INotifications } from 'decorators/withDialog/types';
import { IAttachment } from 'lib/types';
import { ReactText } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps, INotifications {
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
