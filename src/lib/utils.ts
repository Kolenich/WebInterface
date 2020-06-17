import { Column, Filter, Sorting, SortingDirection } from '@devexpress/dx-react-grid';
import { tasksFilterLookUps } from 'pages/TasksTable/settings';
import { ComponentType, DependencyList, EffectCallback, ReactText, useEffect, useRef } from 'react';
import { FILTERING_PARAMS, PROXY_PREFIX, SORTING_PARAMS } from './constants';
import { ActualFileObject, IDecorator, IGetConfig } from './types';

/**
 * Функция получения текущего хоста для запроса на сервер.
 * @returns {string} имя хоста с протоколом
 */
const getCurrentHost = () => {
  const url = window.location.href;
  const arr = url.split('/');
  return `${arr[0]}//${arr[2]}${PROXY_PREFIX}`;
};

/**
 * Функция получения ключа объекта по значению
 * @param {any} obj объект поиска
 * @param value значение
 * @return {string | undefined}
 */
export const getKeyByValue = (obj: { [key: string]: unknown }, value: unknown) => (
  Object.keys(obj).find((key) => obj[key] === value)
);

/**
 * Функция, генерирующая URL запроса для запросов на сервер
 * @param {boolean} production флаг продакшена
 */
export const getBaseUrl = (production: boolean) => (
  production ? getCurrentHost() : 'http://localhost:8080'
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
 * Функция получения конфига для пагинации
 * @param {number} pageSize размер страницы
 * @param {number} currentPage индекс текущей страницы
 * @returns {IGetConfig} конфиг для пагинации
 */
export const getPaginationConfig = (pageSize: number, currentPage: number) => ({
  limit: pageSize, offset: currentPage * pageSize,
});

/**
 * Функция для получения конфига для фильтрации
 * @param {Filter[]} filters набор фильтов
 * @param {[key: string]: string} lookups кастомные лукапы для django
 * @returns {Partial<IGetConfig>} конфиг для фильтрации
 */
export const getFilteringConfig = (filters: Filter[], lookups: { [key: string]: string } = {}) => ({
  ...unpackArrayOfObjects<Partial<IGetConfig>>(
    filters.map(({ operation = 'equal', columnName, value }) => ({
      [(lookups[columnName] || columnName) + FILTERING_PARAMS[operation]]: value,
    })),
  ),
});

/**
 * Функция для получения конфига сортировки
 * @param {Sorting[]} sorting набор сортировок
 * @param {[key: string]: string} lookups кастомные лукапы для django
 * @returns {Partial<IGetConfig>} конфиг сортировки
 */
export const getSortingConfig = (sorting: Sorting[], lookups: { [key: string]: string } = {}) => ({
  ...unpackArrayOfObjects<Partial<IGetConfig>>(
    sorting.map(({ direction, columnName }) => ({
      ordering: SORTING_PARAMS[direction] + (lookups[columnName] || columnName),
    })),
  ),
});

/**
 * Функция перекодирования файла в base64 представение
 * @param file {Blob} объект файла
 * @returns {Promise<void>}
 */
export const toBase64 = async (file: ActualFileObject) => (
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  })
);

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
 * Кастомный хук useEffect, который срабатывает лишь при монтировании компонента
 * Идея взята отсюда: https://stackoverflow.com/a/55075818/1526448
 * @param {EffectCallback} effect выполняемый эффект
 */
export const useMountEffect = (effect: EffectCallback) => useEffect(effect, []);

export const compose = <T>(decorators: IDecorator<T>[], Component: ComponentType<T>) => {
  let WrappedComponent = Component;

  for (const decorator of decorators) {
    WrappedComponent = decorator(WrappedComponent);
  }

  return WrappedComponent;
};

/**
 * Функция получения состояния сортировки для таблицы из строки урла
 * @param {string} sorting строка урла
 * @return {Array<Sorting>}
 */
export const getSortingState = (sorting?: string) => {
  if (!sorting) {
    return [];
  }
  if (sorting.charAt(0) === '-') {
    return [{ columnName: sorting.substr(1), direction: 'desc' as SortingDirection }];
  }
  return [{ columnName: sorting, direction: 'asc' as SortingDirection }];
};

/**
 * Фугкция получения состояния текущей страницы в таблице
 * @param {ReactText} limit параметр из строки урла
 * @param {ReactText} offset параметр из строки урла
 * @return {number} текущая страница
 */
export const getCurrentPageState = (limit?: ReactText, offset?: ReactText) => {
  if (!(limit && offset)) {
    return 0;
  }
  return Number(offset) / Number(limit);
};

/**
 * Функция формирования фильтров для таблицы на основе строки запроса
 * @param {Partial<IGetConfig>} params параметры строки запроса
 * @param {Column[]} columns список колонок в таблице
 * @return {Filter[]}
 */
export const getFiltersState = (params: Partial<IGetConfig>, columns: Column[]) => {
  const filters: Filter[] = [];
  const columnNames = columns.map((column) => column.name);

  for (const key of Object.keys(params)) {
    const [columnName, lookup] = key.split('__');
    if (columnNames.includes(getKeyByValue(tasksFilterLookUps, columnName) || columnName)) {
      const operation = getKeyByValue(FILTERING_PARAMS, `__${lookup}`) || 'equal';
      filters.push({
        operation,
        columnName: getKeyByValue(tasksFilterLookUps, columnName) || columnName,
        value: params[key] as string,
      });
    }
  }
  return filters;
};
