import {
  Column,
  FilteringState,
  SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps {
}

export interface IRow {
  /** Ключ задачи в таблице */
  id?: number;
  /** Краткое описание */
  summary: string;
  /** Описание */
  description: string;
  /** Дата назначения */
  date_of_issue: string;
  /** Указатель на выполненность задачи */
  done: boolean;
  /** Срок выполнения */
  dead_line: string;
  /** Комментарий */
  comment: string;
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
  /** Список допустимых операций фильтрации для булевских полей */
  booleanFilterOperations?: string[];
  /** Список допустимых операций фильтрации для полей для назначившего задачу */
  assignerFilterOperations?: string[];
  /** Список допустимых операций фильтрации для полей даты */
  dateFilterOperations?: string[];
  /** Список текстовых полей */
  textColumns?: string[];
  /** Список полей с датой */
  dateColumns?: string[];
  /** Список булевских полей */
  booleanColumns?: string[];
  /** Список полей для назначившего задачу */
  assignerColumns?: string[];
  /** Список список зафитксированных српава колонок */
  rightFixedColumns?: string[];
}

export interface ICustomLookUps {
  /** Кастомный lookup для поля summary */
  summary: string;
  /** Кастомный lookup для поля date_of_issue */
  date_of_issue: string;
  /** Кастомный lookup для поля assigned_by */
  assigned_by: string;
  /** Кастомный lookup для поля assigned_to */
  assigned_to: string;
  /** Кастомный lookup для поля dead_line */
  dead_line: string;
  /** Кастомный lookup для поля comment */
  comment: string;
  /** Кастомный lookup для поля done */
  done: string;

  [index: string]: string;
}