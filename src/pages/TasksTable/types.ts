import {
  Column,
  FilteringState,
  SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';
import { VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { IAttachment } from 'lib/types';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps<IFilterParams> {
}

export interface IRow {
  /** Первичный ключ задачи в БД */
  readonly id: number;
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
  filter: 'completed' | 'in-process' | 'archived';
}

export interface IColumnSettings {
  /** Список столбцов в таблице */
  columns: Column[];
  /** Ширина столбцов по умолчанию */
  defaultColumnWidths?: TableColumnWidthInfo[];
  /** Настройки столбцов по сортировке */
  sortingStateColumnExtensions?: SortingState.ColumnExtension[];
  /** Настройки столбцов по фильтрации */
  filteringStateColumnExtensions?: FilteringState.ColumnExtension[];
  /** Список объектов с настройками столбцов */
  columnsExtensions?: VirtualTable.ColumnExtension[];
}

export interface ICustomLookUps {
  [index: string]: string;
}

export interface ISorting {
  /** Подстановка параметра для сортировки по возрастанию */
  asc: string;
  /** Подстановка параметра для сортировки по убыванию */
  desc: string;
}

export interface IFiltering {
  /** Подстановка параметра для фильтрации типа contains */
  contains: string;
  /** Подстановка параметра для фильтрации типа equal */
  equal: string;
  /** Подстановка параметра для фильтрации типа statsWith */
  startsWith: string;
  /** Подстановка параметра для фильтрации типа endsWith */
  endsWith: string;
  /** Подстановка параметра для фильтрации типа gte */
  greaterThanOrEqual: string;
  /** Подстановка параметра для фильтрации типа lte */
  lessThanOrEqual: string;
  /** Подстановка параметра для фильтрации типа lt */
  lessThan: string;
  /** Подстановка параметра для фильтрации типа gt */
  greaterThan: string;

  [index: string]: string;
}
