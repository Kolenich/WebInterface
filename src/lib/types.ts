import { DataTypeProviderProps, Filter, Sorting } from '@devexpress/dx-react-grid';
import { ReactText } from 'react';
import { IVariantIcons } from './generic/Snackbar/types';

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
  name?: string | undefined;
  /** Значение в DOM-элементе */
  value: unknown;
}

export type Validation = 'latin' | 'cyrillic' | 'phone' | 'email';

export type IValidationFunction = (value: string) => boolean;

export interface IValidationMethods {
  /** Функция валидации телефона */
  phone: IValidationFunction;
  /** Функция валидации электронной почты */
  email: IValidationFunction;
  /** Функция валидации латиницы */
  latin: IValidationFunction;
  /** Функция валидации кириллицы */
  cyrillic: IValidationFunction;

  [index: string]: IValidationFunction;
}

export interface IValidationMessages {
  /** Сообщение об ошибке валидации телефона */
  phone: string;
  /** Сообщение об ошибке валидации электронной почты */
  email: string;
  /** Сообщение об ошибке валидации латиницы */
  latin: string;
  /** Сообщение об ошибке валидации кириллицы */
  cyrillic: string;

  [index: string]: string;
}

export interface ISelectEvent {
  /** Имя HTML-элемента */
  name?: string | undefined;
  /** Значение селекта */
  value: unknown;
}

export interface IFileObject {
  /** Дата изменения */
  readonly lastModified: number;
  /** Имя файла */
  readonly name: string;
}

export interface IAuthResponse {
  /** Возвращаемый токен */
  key: string;
}

export type IActualFileObject = Blob & IFileObject;

export interface ISnackbarProps {
  /** Флаг открытия/закрытия */
  open: boolean;
  /** Сообщение на снэкбаре */
  message: string;
  /** Статус снэкбара */
  variant: keyof IVariantIcons;
}

export type IDialogStatus = 'success' | 'error' | 'warning' | 'loading';

export interface IDialogProps {
  /** Флаг открытия/закрытия */
  open: boolean;
  /** Сообщение на снэкбаре */
  message: string;
  /** Статус снэкбара */
  status: IDialogStatus;
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
