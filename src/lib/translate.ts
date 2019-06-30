import { PagingPanel, Table, TableFilterRow, TableHeaderRow } from '@devexpress/dx-react-grid';

export const filterRowMessages: TableFilterRow.LocalizationMessages = {
  filterPlaceholder: 'Фильтр...',
  contains: 'Содержит',
  equal: 'Соответствует',
  notContains: 'Не содержит',
  notEqual: 'Не соответствует',
  startsWith: 'Начинается с',
  endsWith: 'Оканчивается на',
};

export const pagingPanelMessages: PagingPanel.LocalizationMessages = {
  rowsPerPage: 'Записей на странице',
  showAll: 'Все',
  info: (parameters) => {
    return `${parameters.from}-${parameters.to} из ${parameters.count}`;
  },
};

export const tableMessages: Table.LocalizationMessages = {
  noData: 'Нет данных',
};

export const tableHeaderRowMessage: TableHeaderRow.LocalizationMessages = {
  sortingHint: 'Сортировать',
};
