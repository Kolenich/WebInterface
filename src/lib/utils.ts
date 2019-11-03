import { Filter, Sorting } from '@devexpress/dx-react-grid';
import { ICustomLookUps } from '../components/TasksTable/types';
import { FILTERING_PARAMS, SORTING_PARAMS } from './constants';
import { IGetConfig } from './types';


/**
 * Функция получения текущего хоста для запроса на сервер.
 * @returns {string} имя хоста с протоколом
 */
const getCurrentHost = (): string => {
  const url: string = window.location.href;
  const arr: string[] = url.split('/');
  return `${arr[0]}//${arr[2]}`;
};

/**
 * Функция, генерирующая URL запроса для запросов на сервер
 */
export const getBaseUrl = (): string => (
  process.env.NODE_ENV === 'production'
    ? getCurrentHost()
    : 'http://localhost:8080'
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
export const getPaginationConfig = (pageSize: number, currentPage: number): IGetConfig => (
  { limit: pageSize, offset: currentPage! * pageSize! }
);

/**
 * Функция для получения конфига для фильтрации
 * @param {Filter[]} filters набор фильтов
 * @param {ICustomLookUps} lookups кастомные лукапы для django
 * @returns {Partial<IGetConfig>} конфиг для фильтрации
 */
export const getFilteringConfig =
  (filters: Filter[], lookups?: ICustomLookUps,
  ): Partial<IGetConfig> => ({
    ...unpackArrayOfObjects<Partial<IGetConfig>>(
      filters.map(({ operation, columnName, value }: Filter): Partial<IGetConfig> => {
        let lookupPart: string = columnName;
        if (lookups) {
          lookupPart = lookups[columnName];
        }
        return { [lookupPart + FILTERING_PARAMS[operation!]]: value };
      }),
    ),
  });

/**
 * Функция для получения конфига сортировки
 * @param {Sorting[]} sorting набор сортировок
 * @param {ICustomLookUps} lookups кастомные лукапы для django
 * @returns {Partial<IGetConfig>} конфиг сортировки
 */
export const getSortingConfig = (
  sorting: Sorting[], lookups?: ICustomLookUps,
): Partial<IGetConfig> => ({
  ...unpackArrayOfObjects<Partial<IGetConfig>>(
    sorting.map(({ direction, columnName }: Sorting): Partial<IGetConfig> => {
      let lookupPart: string = columnName;
      if (lookups) {
        lookupPart = lookups[columnName];
      }
      return { ordering: SORTING_PARAMS[direction] + lookupPart };
    }),
  ),
});
