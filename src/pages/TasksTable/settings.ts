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
  defaultOrder: [
    'summary',
    'date_of_issue',
    'assigned_by',
    'dead_line',
    'comment',
    'attachment',
  ],
  sortingStateColumnExtensions: [
    { columnName: 'attachment', sortingEnabled: false },
  ],
  filteringStateColumnExtensions: [
    { columnName: 'attachment', filteringEnabled: false },
  ],
  textFilterOperations: ['contains', 'startsWith', 'endsWith', 'equal'],
  assignerFilterOperations: ['equal'],
  dateTimeFilterOperations: [
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
  ],
  textColumns: ['summary', 'comment'],
  dateTimeColumns: ['date_of_issue', 'dead_line'],
  assignerColumns: ['assigned_by'],
  attachmentColumns: ['attachment'],
};

export const tasksFilterLookUps: ICustomLookUps = {
  summary: 'summary',
  date_of_issue: 'date_of_issue',
  assigned_by: 'assigned_by_id',
  dead_line: 'dead_line',
  comment: 'comment',
};

export const tasksSortingLookUps: ICustomLookUps = {
  summary: 'summary',
  date_of_issue: 'date_of_issue',
  assigned_by: 'assigned_by__last_name',
  dead_line: 'dead_line',
  comment: 'comment',
};
