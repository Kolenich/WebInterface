import { DataTypeProviderProps, Filter, Sorting } from '@devexpress/dx-react-grid';
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

export interface IServerResponses {
  /** Указатель статуса "OK" */
  200: string;
  /** Указатель статуса "CREATED" */
  201: string;
  /** Указатель статуса "DELETED" */
  204: string;
  /** Указатель статуса "BAD_REQUEST" */
  400: string;
  /** Указатель статуса "NOT_FOUND" */
  404: string;
  /** Указатель статуса "ENTITY_TOO_LARGE" */
  413: string;
  /** Указатель статуса "METHOD_NOT_ALLOWED" */
  405: string;
  /** Указатель статуса "INTERNAL_SERVER_ERROR" */
  500: string;
  /** Указатель статуса "BAD_GATEAWAY" */
  502: string;

  [index: number]: string;
}

export interface ISelectElement {
  /** Имя в DOM-элементе */
  name?: string;
  /** Значение в DOM-элементе */
  value: unknown;
}

export interface IAuthResponse {
  /** Возвращаемый токен */
  key: string;
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
  filters?: Filter[];
  /** Список сортировок по колонкам */
  sorting?: Sorting[];
  /** Допустимые размеры страниц */
  pageSizes?: number[];
  /** Текущий размер страницы */
  pageSize?: number;
  /** Общее количество строк в таблице */
  totalCount?: number;
  /** Индекс текущей страницы */
  currentPage?: number;
}

export interface ICustomDataTypeProviderProps extends DataTypeProviderProps {
  /** Ключ списка кастомных переопределений типов */
  key: number;
}

export interface IDashBoardTitles {
  /** Заголовок для раздела Выполненных задач */
  completed: string;
  /** Заголовок для раздела Задач в процессе */
  'in-process': string;

  [index: string]: string;
}
