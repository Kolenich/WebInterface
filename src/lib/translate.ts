import {
  GroupingPanel,
  PagingPanel,
  SearchPanel,
  Table,
  TableFilterRow,
  TableHeaderRow,
} from '@devexpress/dx-react-grid';

export const filterRowMessages: TableFilterRow.LocalizationMessages = {
  filterPlaceholder: 'Фильтр...',
};

export const pagingPanelMessages: PagingPanel.LocalizationMessages = {
  rowsPerPage: 'Записей на странице',
  showAll: 'Все',
  info: parameters => {
    return `${parameters.from}-${parameters.to} из ${parameters.count}`;
  },
};

export const searchPanelMessages: SearchPanel.LocalizationMessages = {
  searchPlaceholder: 'Поиск...',
};

export const tableMessages: Table.LocalizationMessages = {
  noData: 'Нет данных',
};

export const tableHeaderRowMessage: TableHeaderRow.LocalizationMessages = {
  sortingHint: 'Сортировать',
};

export const groupByMessages: GroupingPanel.LocalizationMessages = {
  groupByColumn: 'Перетащите сюда заголовок колонки, чтобы сгруппировать по нему',
};
