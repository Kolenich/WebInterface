import {
  CustomPaging,
  DataTypeProvider,
  DataTypeProviderProps,
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
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import { Loading, withDialog } from 'components';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import RootComponent from 'components/TableComponents/RootComponent';
import RowComponent from 'components/TableComponents/RowComponent';
import api from 'lib/api';
import { DASH_BOARD_TITLES } from 'lib/constants';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import { IApiResponse, IGetConfig, ITable } from 'lib/types';
import { useMountEffect } from 'lib/utils';
import { tableSettings } from 'pages/TasksTable/settings';
import React, { FC, useContext, useEffect, useState } from 'react';
import customDataTypes from './customDataTypes';
import styles from './styles';
import { IProps, IRow } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент таблицы для отображения всех заданий у пользователя
 * @param {match<IFilterParams>} match передаваемые параметры в адресную строку
 * @param {(error: AxiosError, by: ("dialog" | "snackbar")) => void} showError функция вывода ошибки
 * @param {History<LocationState>} history история
 * @param {Location<LocationState>} location текущая локация
 * @return {JSX.Element}
 * @constructor
 */
const TasksTable: FC<IProps> = ({ match, showError, history, location }) => {
  const classes = useStyles();

  const {
    setters: { updateDashBoardTitle }, getters: { documentTitle },
  } = useContext<IGlobalState>(Context);

  // Переменные состояния основной таблицы
  const [table, setTable] = useState<ITable<IRow>>({
    rows: [],
    filters: [],
    pageSizes: [5, 10, 20],
    totalCount: 0,
    pageSize: 5,
    currentPage: 0,
    sorting: [],
  });

  // Переменная состояния загрузки
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Функция изменения сортировок
   * @param {Sorting[]} sorting массив сортировок
   */
  const changeSorting = (sorting: Sorting[]) => (
    setTable((oldTable) => ({ ...oldTable, sorting }))
  );

  /**
   * Метод для обработки изменения числа строк на странице
   * @param {number} pageSize размер страницы
   */
  const changePageSize = (pageSize: number) => (
    setTable((oldTable) => ({ ...oldTable, pageSize, currentPage: 0 }))
  );

  /**
   * Функция обработки изменения текущей страницы
   * @param {number} currentPage номер текущей страницы
   */
  const changeCurrentPage = (currentPage: number) => (
    setTable((oldTable) => ({ ...oldTable, currentPage }))
  );

  /**
   * Функция изменения фильтров
   * @param {Filter[]} filters массив фильтров
   */
  const changeFilters = (filters: Filter[]) => (
    setTable((oldTable) => ({ ...oldTable, filters }))
  );

  /**
   * Функция для выдачи фильтра в зависимости от параметра в урле
   * @param {"completed" | "in-process"} filter параметр для фильтра
   * @returns {boolean} фильтр
   */
  const taskFilter = (filter: 'completed' | 'in-process') => filter === 'completed';

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  const loadData = () => {
    setLoading(true);
    const params: IGetConfig = {
      // В зависимости от выбранного пункта меню фильтруем список заданий
      done: taskFilter(match.params.filter),
    };
    api.getContent<IApiResponse<IRow>>('tasks/dashboard/', params)
      .then((response: AxiosResponse<IApiResponse<IRow>>) => {
        const { results: rows, count: totalCount } = response.data;
        setTable((oldTable) => ({ ...oldTable, rows, totalCount }));
      })
      .catch(showError)
      .finally(() => setLoading(false));
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = () => updateDashBoardTitle(DASH_BOARD_TITLES[match.params.filter]);

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
  const getRowId = (row: IRow) => row.id!;

  useMountEffect(setDocumentTitle);

  // Выгружаем данные только при смене урла
  useEffect(loadData, [location.search, match.params.filter]);
  useEffect(setDashBoardTitle, [match.params.filter]);

  return (
    <>
      <Paper className={classes.paper}>
        <Grid
          rows={table.rows}
          columns={tableSettings.columns}
          getRowId={getRowId}
          rootComponent={RootComponent}
        >
          {customDataTypes.map((props: DataTypeProviderProps, index) => (
            <DataTypeProvider key={index} {...props} />
          ))}

          <DragDropProvider/>

          <SortingState
            sorting={table.sorting}
            onSortingChange={changeSorting}
            columnExtensions={tableSettings.sortingStateColumnExtensions}
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
            columnExtensions={tableSettings.filteringStateColumnExtensions}
          />

          <VirtualTable
            height="auto"
            messages={tableMessages}
            rowComponent={RowComponent}
            columnExtensions={tableSettings.columnsExtensions}
          />

          <TableColumnReordering
            defaultOrder={tableSettings.columns.map((column) => column.name)}
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
      {loading && <Loading/>}
    </>
  );
};

export default withDialog(TasksTable);
