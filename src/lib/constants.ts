import { IDashBoardTitles, IFiltering, IServerResponses, ISorting } from './types';

// Опции для форматирования даты
export const DATE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

// Опции для форматирования даты и времени
export const DATETIME_OPTIONS = {
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
  404: 'Запрашиваемый адрес не найден',
  405: 'Данный метод запроса не разрешен',
  413: 'Загружаемый файл не должен превышать 16 Мб',
  500: 'Внутренняя ошибка сервера',
  502: 'Время ожидания ответа от сервера истекло',
};

export const SORTING_PARAMS: ISorting = {
  asc: '',
  desc: '-',
};

export const FILTERING_PARAMS: IFiltering = {
  contains: '__icontains',
  equal: '',
  startsWith: '__istartswith',
  endsWith: '__iendswith',
  greaterThan: '__gt',
  greaterThanOrEqual: '__gte',
  lessThan: '__lt',
  lessThanOrEqual: '__lte',
};
// Высота тулбара
export const APPBAR_HEIGHT = 64;

export const SERVER_NOT_AVAILABLE = 'Сервер не доступен, попробуйте позже';

export const DASH_BOARD_TITLES: IDashBoardTitles = {
  completed: 'Выполненные',
  'in-process': 'В процессе',
};

export const PROXY_PREFIX = '/diary/';
