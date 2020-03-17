import {
  Column,
  FilteringState,
  SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';
import { VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { INotifications } from 'components/DialogAlert/types';
import { IAttachment } from 'lib/types';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps<IFilterParams>, INotifications {
}

export interface IRow {
  /** Первичный ключ задачи в БД */
  readonly id?: number;
  /** Краткое описание */
  summary: string;
  /** Описание */
  description: string;
  /** Дата назначения */
  date_of_issue: string;
  /** Срок выполнения */
  dead_line: string;
  /** Комментарий */
  comment: string;
  /** Вложение */
  attachment: IAttachment | null;
}

export interface IFilterParams {
  /** Фильтр заданий */
  filter: 'completed' | 'in-process';
}

export interface IColumnSettings {
  /** Список столбцов в таблице */
  columns: Column[];
  /** Ширина столбцов по умолчанию */
  defaultColumnWidths?: TableColumnWidthInfo[];
  /** Базовый порядок столбцов в таблице */
  defaultOrder?: string[];
  /** Настройки столбцов по сортировке */
  sortingStateColumnExtensions?: SortingState.ColumnExtension[];
  /** Настройки столбцов по фильтрации */
  filteringStateColumnExtensions?: FilteringState.ColumnExtension[];
  /** Список допустимых операций фильтрации для текстовых полей */
  textFilterOperations?: string[];
  /** Список допустимых операций фильтрации для полей для назначившего задачу */
  assignerFilterOperations?: string[];
  /** Список допустимых операций фильтрации для полей даты с временем */
  dateTimeFilterOperations?: string[];
  /** Список текстовых полей */
  textColumns?: string[];
  /** Список полей с датой и временем */
  dateTimeColumns?: string[];
  /** Список полей для назначившего задачу */
  assignerColumns?: string[];
  /** Список полей для прикрепленных вложений */
  attachmentColumns?: string[];
  /** Список объектов с настройками столбцов */
  columnsExtensions?: VirtualTable.ColumnExtension[];
}

export interface ICustomLookUps {
  [index: string]: string;
}
