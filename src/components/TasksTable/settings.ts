import { IColumnSettings, ICustomLookUps } from 'components/TasksTable/types';
import { ISelectItem } from 'lib/generic/Select/types';

export const tableSettings: IColumnSettings = {
  columns: [
    { name: 'summary', title: 'Краткое описание' },
    { name: 'date_of_issue', title: 'Дата назначения' },
    { name: 'assigned_by', title: 'Кто назначил' },
    { name: 'assigned_to', title: 'Кому назначенно' },
    { name: 'dead_line', title: 'Срок исполнения' },
    { name: 'comment', title: 'Комментарий' },
    { name: 'done', title: 'Выполнено' },
  ],
  defaultColumnWidths: [
    { columnName: 'summary', width: 300 },
    { columnName: 'date_of_issue', width: 200 },
    { columnName: 'assigned_by', width: 300 },
    { columnName: 'assigned_to', width: 300 },
    { columnName: 'dead_line', width: 200 },
    { columnName: 'comment', width: 300 },
    { columnName: 'done', width: 200 },
  ],
  defaultOrder: [
    'summary',
    'date_of_issue',
    'assigned_by',
    'assigned_to',
    'dead_line',
    'comment',
    'done',
  ],
  sortingStateColumnExtensions: [
    { columnName: 'assigned_by', sortingEnabled: false },
    { columnName: 'assigned_to', sortingEnabled: false },
  ],
  filteringStateColumnExtensions: [],
  textFilterOperations: ['contains', 'startsWith', 'endsWith', 'equal'],
  booleanFilterOperations: ['equal'],
  assignerFilterOperations: ['equal'],
  dateFilterOperations: [
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
    'equal',
  ],
  textColumns: ['summary', 'comment'],
  dateColumns: ['date_of_issue', 'dead_line'],
  booleanColumns: ['done'],
  assignerColumns: ['assigned_by', 'assigned_to'],
  rightFixedColumns: ['done'],
};

export const booleanItems: ISelectItem[] = [
  { key: 1, value: 'true', label: 'Да' },
  { key: 2, value: 'false', label: 'Нет' },
];

export const tasksCustomLookUps: ICustomLookUps = {
  summary: 'summary',
  date_of_issue: 'date_of_issue',
  assigned_by: 'assigned_by_id',
  assigned_to: 'assigned_to_id',
  dead_line: 'dead_line',
  comment: 'comment',
  done: 'done',
};
