import { ReactText } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps<IDetailParams> {
}

export interface ITaskDetail {
  /** Первичный ключ */
  id?: number;
  /** Данные о назначившем */
  assigned_by: IAssignedBy;
  /** Комментарий */
  comment: string;
  /** Дата назначения */
  date_of_issue: string | null;
  /** Срок исполнения */
  dead_line: string | null;
  /** Описание задания */
  description: string;
  /** Указатель на выполненность задания */
  done: boolean;
  /** Краткое описание задания */
  summary: string;

  [index: string]: ReactText | undefined | null | IAssignedBy | boolean;
}

interface IAssignedBy {
  /** Имя назначившего */
  first_name: string;
  /** Фамилия назначившего */
  last_name: string;
}

interface IDetailParams {
  /** Первичный ключ задания */
  id?: string;
}
