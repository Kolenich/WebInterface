import { ISelectItem } from './generic/Select/types';
import { IEmployeeLabels, IFiltering, IServerResponses, ISorting } from './types';

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

// Ярлыки для объекта Employee
export const employeeLabels: IEmployeeLabels = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  middle_name: 'Отчество',
  phone: 'Телефон',
  email: 'Электронная почта',
  date_of_birth: 'Дата рождения',
  sex: 'Пол',
};

// Сообщения статусов
export const SERVER_RESPONSES: IServerResponses = {
  200: 'Сохранение прошло успешно!',
  201: 'Создание прошло успешно!',
  204: 'Удаление прошло успешно!',
  400: 'Некорректное тело запроса',
  404: 'Запрашиваемый URL не найден',
  405: 'Данный метод запроса не разрешен',
  413: 'Загружаемый файл не должен превышать 16 Мб',
  500: 'Внутренняя ошибка сервера',
  502: 'Время ожидания ответа от сервера истекло',
};

/**
 * Функция глубокого копирования объекта
 * @param data копируемый объект
 */
export function deepCopy<IData>(data: IData) {
  return JSON.parse(JSON.stringify(data)) as IData;
}

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
 * Функция конвертации blob-Объекта файла в base64
 * @param file
 */
export function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * Функция конвертации файла с сервера в base64
 * @param url - url файла с сервера
 * @param callback функция-колбэк, возвращающая файл в формате base64
 */
export function toDataURL(url: string, callback: (dataUrl: any) => void): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.onload = function () {
    const reader: FileReader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

/**
 * Функция, генерирующая URL запроса для запросов на сервер
 */
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://vps706754.ovh.net';
  }
  return 'http://localhost:8080';
}

export const sexChoices: ISelectItem[] = [
  { key: 0, label: 'Муж.', value: 'male' },
  { key: 1, label: 'Жен.', value: 'female' },
];
