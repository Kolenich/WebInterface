import { Done, Error } from '@material-ui/icons';
import { SnackbarProviderProps } from 'notistack';
import { createElement } from 'react';
import { IDashBoardTitles, IFiltering, IServerResponses, ISorting } from './types';

// Опции для форматирования даты
export const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

// Опции для форматирования даты и времени
export const dateTimeOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

// Сообщения статусов
export const SERVER_RESPONSES: IServerResponses = {
  200: 'Сохранение прошло успешно!',
  201: 'Создание прошло успешно!',
  204: 'Удаление прошло успешно!',
  400: 'Некорректное тело запроса',
  401: 'Вы не авторизованы',
  403: 'У вас нет доступа',
  404: 'Запрашиваемые данные не найдены',
  405: 'Данный метод запроса не разрешен',
  413: 'Загружаемый файл не должен превышать 16 Мб',
  500: 'Внутренняя ошибка сервера',
  502: 'Время ожидания ответа от сервера истекло',
};

export const sortingParams: ISorting = {
  asc: '',
  desc: '-',
};

export const filteringParams: IFiltering = {
  contains: '__icontains',
  equal: '',
  startsWith: '__istartswith',
  endsWith: '__iendswith',
  greaterThan: '__gt',
  greaterThanOrEqual: '__gte',
  lessThan: '__lt',
  lessThanOrEqual: '__lte',
};

/**
 * Функция, генерирующая URL запроса для запросов на сервер
 */
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://vps706754.ovh.net';
  }
  return 'http://localhost:8080';
}

// Высота тулбара
export const appBarHeight: number = 64;

export const SERVER_NOT_AVAILABLE: string = 'Сервер не доступен, попробуйте позже';

export const DASH_BOARD_TITLES: IDashBoardTitles = {
  completed: 'Выполненные',
  'in-process': 'В процессе',
};

/**
 * Функция для распаковки массива объектов в один объект.
 * Используется для формирования конфига фильтрации при щзапросе на сервер
 * @param {T[]} arr массив из объектов
 * @returns {{}} единый объект
 */
export function unpackArrayOfObjects<T>(arr: T[]): T {
  let obj = {} as T;
  for (const elem of arr) {
    obj = { ...obj, ...elem };
  }
  return obj;
}

export const snackbarProviderProps: SnackbarProviderProps = {
  maxSnack: 5,
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  autoHideDuration: 3000,
  iconVariant: {
    success: createElement(Done, { style: { paddingRight: 10 } }),
    error: createElement(Error, { style: { paddingRight: 10 } }),
  },
};
