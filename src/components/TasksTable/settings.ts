import { IColumnSettings, ICustomLookUps } from 'components/TasksTable/types';
import { ISelectItem } from 'lib/generic/Select/types';

export const tableSettings: IColumnSettings = {
  columns: [
    { name: 'summary', title: 'Краткое описание' },
    { name: 'date_of_issue', title: 'Дата назначения' },
    { name: 'assigned_by', title: 'Кто назначил' },
    { name: 'dead_line', title: 'Срок исполнения' },
    { name: 'comment', title: 'Комментарий' },
    { name: 'done', title: 'Выполнено' },
  ],
  defaultColumnWidths: [
    { columnName: 'summary', width: 450 },
    { columnName: 'date_of_issue', width: 200 },
    { columnName: 'assigned_by', width: 300 },
    { columnName: 'dead_line', width: 200 },
    { columnName: 'comment', width: 450 },
    { columnName: 'done', width: 200 },
  ],
  defaultOrder: [
    'summary',
    'date_of_issue',
    'assigned_by',
    'dead_line',
    'comment',
    'done',
  ],
  sortingStateColumnExtensions: [
    { columnName: 'assigned_by', sortingEnabled: false },
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
  assignerColumns: ['assigned_by'],
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
  dead_line: 'dead_line',
  comment: 'comment',
  done: 'done',
};
