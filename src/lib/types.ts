import { Filter, Sorting } from '@devexpress/dx-react-grid';
import { ReactText } from 'react';

export type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IApiResponse<T> {
  /** Общее количество записей в БД */
  count: number;
  /** Ссылка для следующей страницы */
  next: string;
  /** Ссылка для предыдущей страницы */
  previous: string;
  /** Записи для текущей страницы */
  results: T[];
}

export interface IServerResponses {
  [index: number]: string;
}

export interface ISelectElement {
  /** Имя в DOM-элементе */
  name?: string;
  /** Значение в DOM-элементе */
  value: unknown;
}

export interface IGetConfig {
  /** Предел выгружаемых данных */
  limit?: number;
  /** Крайняя запись */
  offset?: number;
  /** Сортировка */
  ordering?: string;

  [key: string]: ReactText | undefined | boolean;
}

export interface ITable<T> {
  /** Строки в таблице */
  rows: T[];
  /** Список фильтров по колонкам */
  filters: Filter[];
  /** Список сортировок по колонкам */
  sorting: Sorting[];
  /** Допустимые размеры страниц */
  pageSizes?: number[];
  /** Текущий размер страницы */
  pageSize: number;
  /** Общее количество строк в таблице */
  totalCount: number;
  /** Индекс текущей страницы */
  currentPage: number;
}

export interface IDashBoardTitles {
  /** Заголовок для раздела Выполненных задач */
  completed: string;
  /** Заголовок для раздела Задач в процессе */
  'in-process': string;

  [index: string]: string;
}

export type ActualFileObject = Blob & {
  /** Уазатель последнего изменения */
  readonly lastModified: number;
  /** Имя загруженного файла */
  readonly name: string
};

export interface IAttachment {
  /** Первичный ключ вложения в БД */
  readonly id?: number;
  /** Имя вложения */
  file_name: string;
  /** Тип вложения */
  file_mime: string;
  /** Размер вложения */
  file_size: number;
  /** Файл вложения */
  file: string | ActualFileObject;

  [key: string]: ReactText | ActualFileObject | undefined;
}

export interface IHeaders {
  [key: string]: string;
}

export interface IErrors {
  [key: string]: string[];
}
