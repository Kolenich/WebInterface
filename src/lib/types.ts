import { ReactText } from 'react';
import { IVariantIcons } from './generic/Snackbar/types';

export interface IEmployee {
  /** id сотрудника */
  id?: number;
  /** Имя */
  first_name: string;
  /** Фамилия */
  last_name: string;
  /** Отчество */
  middle_name: string | null;
  /** Телефон */
  phone: string | null;
  /** Возраст */
  age?: number;
  /** Электронная почта */
  email: string;
  /** Дата рождения */
  date_of_birth: string | null;
  /** Дата регистрации */
  registration_date: string | null;
  /** Пол сотрудника */
  sex: Sex;
  /** Аватар сотрудника */
  avatar: IAvatar | null;

  [index: string]: ReactText | undefined | null | boolean | IAvatar;
}

export interface IAvatar {
  /** id аватара */
  id?: number;
  /** Ссылка для загрузки файла или его base64 представление */
  file: string;
  /** Тип файла */
  content_type: string;
  /** Размер файла в байтах */
  size: ReactText;
  /** Имя файла */
  file_name: string;
}

export interface ITableRow {
  /** id строки */
  id: number;
  /** Относительный URL для загрузки файла */
  avatar: string;
  /** ФИО сотрудника */
  full_name: string;
  /** Телефон */
  phone: string | null;
  /** Возраст */
  age: number;
  /** Электронная почта */
  email: string;
  /** Дата рождения */
  date_of_birth: string;
  /** Дата регистрации */
  registration_date: string;
  /** Пол сотрудника */
  sex: string;
}

export type Sex = 'male' | 'female' | '';

export type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IApiResponse<DataType> {
  /** Общее количество записей в БД */
  count: number;
  /** Ссылка для следующей страницы */
  next: string;
  /** Ссылка для предыдущей страницы */
  previous: string;
  /** Записи для текущей страницы */
  results: DataType[];
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

export interface IGetConfig {
  /** Предел выгружаемых данных */
  limit?: number;
  /** Крайняя запись */
  offset?: number;
  /** Сортировка */
  ordering?: string;

  [key: string]: ReactText | undefined;
}
