import { ButtonProps } from '@material-ui/core/Button';
import { match } from 'react-router';

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
  date_of_birth: Date | string;
  /** Дата регистрации */
  registration_date: Date | string;
  /** Пол сотрудника */
  sex: Sex;
  /** Аватар сотрудника */
  avatar: IAvatar | null;

  [index: string]: string | number | undefined | null | boolean | Date | IAvatar;
}

export interface IAvatar {
  /** id аватара */
  id?: number;
  /** Ссылка для загрузки файла или его base64 представление */
  file: string;
  /** Тип файла */
  content_type: string;
  /** Размер файла в байтах */
  size: string | number;
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
  date_of_birth: Date | string;
  /** Дата регистрации */
  registration_date: Date | string;
  /** Пол сотрудника */
  sex: string;
}

export type Sex = 'male' | 'female' | '';

export interface IEmployeeLabels {
  /** Ярлык для имени */
  first_name: string;
  /** Ярлык для фамилии */
  last_name: string;
  /** Ярлык для отчества */
  middle_name: string;
  /** Ярлык для телефона */
  phone: string;
  /** Ярлык для электронной почты */
  email: string;
  /** Ярлык для даты рождения */
  date_of_birth: string;
  /** Ярлык для пола сотрудника */
  sex: string;

  [index: string]: string;
}

export type PrimaryButtonIcon = 'save' | 'add' | 'confirm' | 'update' | 'edit';

export type SecondaryButtonIcon = 'delete' | 'cancel';

export interface ICustomButtonProps extends ButtonProps {
  /** Текст кнопки */
  text: string;
  /** Тип иконки */
  icon?: PrimaryButtonIcon | SecondaryButtonIcon;
}

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

export interface IDRFGetConfig {
  /** Параметры GET-запроса */
  params: any;
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

export interface IRouterProps {
  /** История в браузере */
  history: History;
  /** Текущее местополжение (URL) */
  location: Location;
  /** Дополнительные параметры роутера */
  match: match<any>;
}
