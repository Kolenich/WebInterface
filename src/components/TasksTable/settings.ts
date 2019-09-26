import { IColumnSettings, ICustomLookUps } from 'components/TasksTable/types';

export const tableSettings: IColumnSettings = {
  columns: [
    { name: 'summary', title: 'Краткое описание' },
    { name: 'date_of_issue', title: 'Дата назначения' },
    { name: 'assigned_by', title: 'Кто назначил' },
    { name: 'dead_line', title: 'Срок исполнения' },
    { name: 'comment', title: 'Комментарий' },
  ],
  columnsExtensions: [
    { columnName: 'summary', wordWrapEnabled: true, width: 350 },
    { columnName: 'date_of_issue', wordWrapEnabled: true, width: 350 },
    { columnName: 'assigned_by', wordWrapEnabled: true, width: 350 },
    { columnName: 'dead_line', wordWrapEnabled: true, width: 350 },
    { columnName: 'comment', wordWrapEnabled: true, width: 300 },
  ],
  defaultOrder: [
    'summary',
    'date_of_issue',
    'assigned_by',
    'dead_line',
    'comment',
  ],
  sortingStateColumnExtensions: [],
  filteringStateColumnExtensions: [],
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
