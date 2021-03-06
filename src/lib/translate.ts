import { PagingPanel, Table, TableFilterRow, TableHeaderRow } from '@devexpress/dx-react-grid';

export const filterRowMessages: TableFilterRow.LocalizationMessages = {
  filterPlaceholder: 'Фильтр...',
  contains: 'Содержит',
  equal: 'Соответствует',
  notContains: 'Не содержит',
  notEqual: 'Не соответствует',
  startsWith: 'Начинается с',
  endsWith: 'Оканчивается на',
  greaterThanOrEqual: 'Больше чем или равно',
  lessThanOrEqual: 'Меньше чем или равно',
  lessThan: 'Меньше чем',
  greaterThan: 'Больше чем',
};

export const pagingPanelMessages: PagingPanel.LocalizationMessages = {
  rowsPerPage: 'Записей на странице',
  showAll: 'Все',
  info: ({ from, to, count }): string => `${from}-${to} из ${count}`,
};

export const tableMessages: Table.LocalizationMessages = {
  noData: 'Нет данных',
};

export const tableHeaderRowMessage: TableHeaderRow.LocalizationMessages = {
  sortingHint: 'Сортировать',
};
