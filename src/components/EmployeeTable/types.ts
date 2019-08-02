import {
  Column,
  Filter,
  Sorting,
  SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';
import { WithStyles } from '@material-ui/core';
import { IRouterProps, ITableRow } from '../../lib/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, IRouterProps {
}

export interface IState {
  /** Список столбцов с датой */
  dateColumns: string[];
  /** Список столбцов с полом */
  sexColumns: string[];
  /** Список столбцов с датой и временем */
  dateTimeColumns: string[];
  /** Список допустимых операций фильтрации для текстовых полей */
  availableTextFilterOperations: string[];
  /** Список допустимых операций фильтрации для столбца "Пол" */
  availableSexFilterOperations: string[];
  /** Список допустимых операций фильтрации для числовых полей */
  availableNumberFilterOperations: string[];
  /** Список допустимых операций фильтрации для полей даты */
  availableDateFilterOperations: string[];
  /** Список допустимых операций фильтрации для полей даты/времени */
  availableDateTimeFilterOperations: string[];
  /** Список текстовых столбцов, которые можно фильтровать */
  textFilterColumns: string[];
  /** Список числовых столбцов, которые можно фильтровать */
  numberFilterColumns: string[];
  /** Список столбцов с аватаром */
  avatarColumns: string[];
  /** Список столбцов с кнопкой */
  buttonColumns: string[];
  /** Строки в таблице */
  rows: ITableRow[];
  /** Номер текущей строки */
  rowId: number;
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
  /** Ширина столбцов по умолчанию */
  defaultColumnWidths: TableColumnWidthInfo[];
  /** Настройки столбцов по сортировке */
  sortingStateColumnExtensions: SortingState.ColumnExtension[];
  /** Допустимые размеры страниц */
  pageSizes: number[];
  /** Текущий размер страницы */
  pageSize: number;
  /** Указатель, открывающий/закрывающий форму для создания/редактирования */
  addEmployee: boolean;
  /** Указатель загрузки */
  loading: boolean;
}
