import {
  Column,
  DataTypeProviderProps,
  EditingState,
  Filter,
  Sorting,
  SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';
import { WithStyles } from '@material-ui/styles';
import { IRouterProps, ITableRow } from 'lib/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, IRouterProps {
}

export interface ICustomDataTypeProviderProps extends DataTypeProviderProps {
  /** Ключ списка кастомных переопределений типов */
  key: number;
}

export interface IState {
  /** Список столбцов с датой */
  dateColumns: string[];
  /** Список столбцов с полом */
  sexColumns: string[];
  /** Список столбцов с датой и временем */
  dateTimeColumns: string[];
  /** Список допустимых операций фильтрации для текстовых полей */
  textFilterOperations: string[];
  /** Список допустимых операций фильтрации для столбца "Пол" */
  sexFilterOperations: string[];
  /** Список допустимых операций фильтрации для числовых полей */
  numberFilterOperations: string[];
  /** Список допустимых операций фильтрации для полей даты */
  dateFilterOperations: string[];
  /** Список допустимых операций фильтрации для полей даты/времени */
  dateTimeFilterOperations: string[];
  /** Список текстовых столбцов, которые можно фильтровать */
  textColumns: string[];
  /** Список числовых столбцов, которые можно фильтровать */
  numberColumns: string[];
  /** Список столбцов с аватаром */
  avatarColumns: string[];
  /** Строки в таблице */
  rows: ITableRow[];
  /** Общее количество строк в таблице */
  totalCount: number;
  /** Индекс текущей страницы */
  currentPage: number;
  /** СПисок столбцов в таблице */
  columns: Column[];
  /** Список фильтров по колонкам */
  filters: Filter[];
  /** Список сортировок по колонкам */
  sorting: Sorting[];
  /** Базовый порядок столбцов в таблице */
  defaultOrder: string[];
  /** Список зафиксированных слева столбцов */
  leftFixedColumns: string[] | symbol[];
  /** Ширина столбцов по умолчанию */
  defaultColumnWidths: TableColumnWidthInfo[];
  /** Настройки столбцов по сортировке */
  sortingStateColumnExtensions: SortingState.ColumnExtension[];
  /** Настройки ячеек по редактирования */
  editingStateColumnExtensions: EditingState.ColumnExtension[];
  /** Допустимые размеры страниц */
  pageSizes: number[];
  /** Текущий размер страницы */
  pageSize: number;
  /** Указатель загрузки */
  loading: boolean;
  /** Переменная, отвечающая за показ снэкбара */
  snackbarOpen: boolean;
  /** Переменная, отвечающая за тип снэкбара */
  snackbarVariant: 'success' | 'error' | 'warning' | 'info';
  /** Переменная, отвечающая за сообщение снэкбара */
  snackbarMessage: string;
}
