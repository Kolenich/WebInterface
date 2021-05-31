import { Filter, Sorting } from '@devexpress/dx-react-grid';
import { IGetConfig } from 'lib/types';
import { unpackArrayOfObjects } from 'lib/utils';
import { IFiltering, ISorting } from './types';

const SORTING_PARAMS: ISorting = {
  asc: '',
  desc: '-',
};

const FILTERING_PARAMS: IFiltering = {
  contains: '__icontains',
  equal: '',
  notEqual: '__ne',
  startsWith: '__istartswith',
  endsWith: '__iendswith',
  greaterThan: '__gt',
  greaterThanOrEqual: '__gte',
  lessThan: '__lt',
  lessThanOrEqual: '__lte',
};

/**
 * Функция для выдачи фильтра в зависимости от параметра в урле
 * @param {"completed" | "in-process"} filter параметр для фильтра
 * @returns {boolean} фильтр
 */
export const urlFilter = (filter: 'completed' | 'in-process' | 'archived') => {
  switch (filter) {
  case 'archived':
    return { archived: true };
  case 'completed':
    return { done: true, archived: false };
  case 'in-process':
    return { done: false, archived: false };
  default:
    return {};
  }
};

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
 * Функция получения конфига для пагинации
 * @param {number} pageSize размер страницы
 * @param {number} currentPage индекс текущей страницы
 * @returns {IGetConfig} конфиг для пагинации
 */
export const getPaginationConfig = (pageSize: number, currentPage: number) => ({
  limit: pageSize, offset: currentPage * pageSize,
});
