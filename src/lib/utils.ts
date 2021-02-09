import { AxiosError } from 'axios';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from './constants';
import { ActualFileObject } from './types';

/**
 * Функция получения текущего хоста для запроса на сервер.
 * @returns {string} имя хоста с протоколом
 */
const getCurrentHost = () => {
  const url = window.location.href;
  const arr = url.split('/');
  return `${arr[0]}//${arr[2]}`;
};

/**
 * Функция, генерирующая URL запроса для запросов на сервер
 * @param {boolean} production флаг продакшена
 */
export const getBaseUrl = (production: boolean) => (
  production ? getCurrentHost() : 'http://localhost:8000'
);

/**
 * Функция для распаковки массива объектов в один объект.
 * Используется для формирования конфига фильтрации при щзапросе на сервер
 * @param {T[]} arr массив из объектов
 * @returns {{}} единый объект
 */
export const unpackArrayOfObjects = <T>(arr: T[]): T => {
  let obj = {} as T;
  for (const elem of arr) {
    obj = { ...obj, ...elem };
  }
  return obj;
};

/**
 * Функция перекодирования файла в base64 представение
 * @param file {Blob} объект файла
 * @returns {Promise<void>}
 */
export const toBase64 = async (file: ActualFileObject) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
});

/**
 * Кастомный хук useEffect, который срабатывает лишь при обновлении, а не в момент монтирования
 * компонента
 * Идея взята отсюда: https://stackoverflow.com/a/55075818/1526448
 * @param {EffectCallback} effect выполняемый эффект
 * @param {DependencyList} deps массив зависимостей
 */
export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList = []) => {
  const isInitialMount = useRef(true);

  /**
   * Обертка для выполняемого действия на обновлении
   */
  const updateEffect = () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  };
  useEffect(updateEffect, deps);
};

/**
 * Функция загрузки файла
 * @param {string} file - ссылка на файл или base64-представление
 * @param {string} name - имя для загрузки
 */
export const download = (file: string, name?: string) => {
  const element = document.createElement('a');
  element.style.display = 'none';
  element.setAttribute('href', file);
  if (name) {
    element.setAttribute('download', name);
  }
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const getErrorMessage = (error: AxiosError, forceMessage?: string) => {
  let message = SERVER_NOT_AVAILABLE;
  if (error.response) {
    message = SERVER_RESPONSES[error.response.status];
    if (error.response.data.detail) {
      message = error.response.data.detail;
    }
    if (error.response.data.non_field_errors) {
      message = error.response.data.non_field_errors[0];
    }
    if (forceMessage) {
      message = forceMessage;
    }
  }
  return message;
};
