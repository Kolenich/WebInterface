import { IColumnSettings, ICustomLookUps } from 'pages/TasksTable/types';

export const tableSettings: IColumnSettings = {
  columns: [
    { name: 'summary', title: 'Краткое описание' },
    { name: 'date_of_issue', title: 'Дата назначения' },
    { name: 'assigned_by', title: 'Кто назначил' },
    { name: 'dead_line', title: 'Срок исполнения' },
    { name: 'comment', title: 'Комментарий' },
    { name: 'attachment', title: 'Вложение' },
  ],
  columnsExtensions: [
    { columnName: 'summary', wordWrapEnabled: true },
    { columnName: 'date_of_issue', wordWrapEnabled: true },
    { columnName: 'assigned_by', wordWrapEnabled: true },
    { columnName: 'dead_line', wordWrapEnabled: true },
    { columnName: 'comment', wordWrapEnabled: true },
    { columnName: 'attachment', wordWrapEnabled: true },
  ],
  sortingStateColumnExtensions: [
    { columnName: 'attachment', sortingEnabled: false },
  ],
  filteringStateColumnExtensions: [
    { columnName: 'attachment', filteringEnabled: false },
  ],
};

export const tasksFilterLookUps: ICustomLookUps = {
  assigned_by: 'assigned_by_id',
};

export const tasksSortingLookUps: ICustomLookUps = {
  assigned_by: 'assigned_by__last_name',
};
