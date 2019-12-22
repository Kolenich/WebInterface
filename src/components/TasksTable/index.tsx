import {
  CustomPaging,
  DataTypeProvider,
  Filter,
  FilteringState,
  PagingState,
  Sorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  PagingPanel,
  TableColumnReordering,
  TableFilterRow,
  TableHeaderRow,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Fade, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { tableSettings, tasksFilterLookUps } from 'components/TasksTable/settings';
import { Context } from 'context';
import { IContext } from 'context/types';
import { withDialog } from 'decorators';
import { Loading } from 'generic';
import api from 'lib/api';
import { DASH_BOARD_TITLES } from 'lib/constants';
import { TASKS_APP } from 'lib/session';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import { IApiResponse, ICustomDataTypeProviderProps, IGetConfig, ITable } from 'lib/types';
import {
  getFilteringConfig,
  getPaginationConfig,
  getSortingConfig,
  useMountEffect,
} from 'lib/utils';
import React, { FC, memo, ReactText, useContext, useEffect, useState } from 'react';
import RootComponent from './components/RootComponent';
import RowComponent from './components/RowComponent';
import customDataTypes from './customDataTypes';
import styles from './styles';
import { IColumnSettings, IProps, IRow } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент таблицы для отображения всех заданий у пользователя
 * @param {match<IFilterParams>} match match передаваемые параметры в адресную строку
 * @param {(error: AxiosError, by: ("dialog" | "snackbar")) => void} showError функция вывода ошибки
 * @returns {JSX.Element}
 * @constructor
 */
const TasksTable: FC<IProps> = ({ match, showError }) => {
  const classes = useStyles();

  const {
    setters: { updateDashBoardTitle }, getters: { documentTitle },
  } = useContext<IContext>(Context);

  // Переменные состояния основной таблицы
  const [table, setTable] = useState<ITable<IRow>>({
    rows: [],
    filters: [],
    sorting: [
      // Сортируем по умолчанию по сроку исполнения
      { columnName: 'dead_line', direction: 'asc' },
    ],
    pageSizes: [5, 10, 20, 0],
    pageSize: 5,
    totalCount: 0,
    currentPage: 0,
  });

  // Переменная состояния загрузки
  const [loading, setLoading] = useState<boolean>(false);

  const [mounted, setMounted] = useState<boolean>(false);

  const [settings] = useState<IColumnSettings>(tableSettings);

  /**
   * Функция изменения сортировок
   * @param {Sorting[]} sorting массив сортировок
   */
  const changeSorting = (sorting: Sorting[]) => (
    setTable((oldTable: ITable<IRow>): ITable<IRow> => ({ ...oldTable, sorting }))
  );

  /**
   * Метод для обработки изменения числа строк на странице
   * @param {number} pageSize размер страницы
   */
  const changePageSize = (pageSize: number) => (
    setTable((oldTable: ITable<IRow>): ITable<IRow> => ({
      ...oldTable,
      pageSize,
      currentPage: 0,
    }))
  );

  /**
   * Функция обработки изменения текущей страницы
   * @param {number} currentPage номер текущей страницы
   */
  const changeCurrentPage = (currentPage: number) => (
    setTable((oldTable: ITable<IRow>): ITable<IRow> => ({ ...oldTable, currentPage }))
  );

  /**
   * Функция изменения фильтров
   * @param {Filter[]} filters массив фильтров
   */
  const changeFilters = (filters: Filter[]) => (
    setTable((oldTable: ITable<IRow>): ITable<IRow> => ({ ...oldTable, filters }))
  );

  /**
   * Функция для выдачи фильтра в зависимости от параметра в урле
   * @param {"completed" | "in-process"} filter параметр для фильтра
   * @returns {boolean} фильтр
   */
  const taskFilter = (filter: 'completed' | 'in-process'): boolean => filter === 'completed';

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  const loadData = () => {
    setLoading((): boolean => true);
    const params: IGetConfig = {
      ...getPaginationConfig(table.pageSize!, table.currentPage!),
      ...getFilteringConfig(table.filters!, tasksFilterLookUps),
      ...getSortingConfig(table.sorting!, tasksFilterLookUps),
      // В зависимости от выбранного пункта меню фильтруем список заданий
      done: taskFilter(match.params.filter),
    };
    api.getContent<IApiResponse<IRow>>('task-table', params, TASKS_APP)
      .then((response: AxiosResponse<IApiResponse<IRow>>) => {
        const { results, count } = response.data;
        setTable((oldTable: ITable<IRow>) => ({
          ...oldTable,
          rows: results,
          totalCount: count,
        }));
      })
      .catch((error: AxiosError) => showError(error, 'snackbar'))
      .finally(() => {
        setLoading((): boolean => false);
        if (!mounted) {
          setMounted((): boolean => true);
        }
      });
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = () => (
    updateDashBoardTitle(DASH_BOARD_TITLES[match.params.filter])
  );

  /**
   * Функция установки заголовка HTML-страницы
   */
  const setDocumentTitle = () => {
    document.title = `${documentTitle} | Мои задания`;
  };

  /**
   * Функция получения уникального идентификатора строки
   * @param {IRow} row строка
   * @returns {React.ReactText} уникальный идентификатор строки
   */
  const getRowId = (row: IRow): ReactText => row.id!;

  useEffect(
    loadData,
    [table.currentPage, table.pageSize, table.filters, table.sorting, match.params.filter],
  );

  useEffect(setDashBoardTitle, [match.params.filter]);

  useMountEffect(setDocumentTitle);

  return (
    <>
      <Fade in={mounted} timeout={750}>
        <Paper className={classes.paper}>
          <Grid
            rows={table.rows}
            columns={settings.columns}
            getRowId={getRowId}
            rootComponent={RootComponent}
          >
            {customDataTypes.map((props: ICustomDataTypeProviderProps) => (
              <DataTypeProvider {...props} />
            ))}
            <DragDropProvider />
            <SortingState
              sorting={table.sorting}
              onSortingChange={changeSorting}
              columnExtensions={settings.sortingStateColumnExtensions}
            />
            <PagingState
              currentPage={table.currentPage}
              pageSize={table.pageSize}
              onPageSizeChange={changePageSize}
              onCurrentPageChange={changeCurrentPage}
            />
            <CustomPaging
              totalCount={table.totalCount}
            />
            <FilteringState
              filters={table.filters}
              onFiltersChange={changeFilters}
              columnExtensions={settings.filteringStateColumnExtensions}
            />
            <VirtualTable
              height="auto"
              messages={tableMessages}
              rowComponent={RowComponent}
              columnExtensions={settings.columnsExtensions}
            />
            <TableColumnReordering
              defaultOrder={settings.defaultOrder}
            />
            <TableHeaderRow
              showSortingControls
              messages={tableHeaderRowMessage}
            />
            <TableFilterRow
              showFilterSelector
              messages={filterRowMessages}
            />
            <PagingPanel
              pageSizes={table.pageSizes}
              messages={pagingPanelMessages}
            />
          </Grid>
        </Paper>
      </Fade>
      {loading && <Loading />}
    </>
  );
};

export default memo(withDialog(TasksTable));
