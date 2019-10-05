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
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import {
  tableSettings,
  tasksFilterLookUps,
  tasksSortingLookUps,
} from 'components/TasksTable/settings';
import { Context } from 'context';
import { IContext } from 'context/types';
import api from 'lib/api';
import auth from 'lib/auth';
import Loading from 'lib/generic/Loading';
import { TASKS_APP } from 'lib/session';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import { IApiResponse, ICustomDataTypeProviderProps, IGetConfig, ITable } from 'lib/types';
import {
  DASH_BOARD_TITLES,
  filteringParams,
  SERVER_NOT_AVAILABLE,
  SERVER_RESPONSES,
  sortingParams,
} from 'lib/utils';
import React, { FC, ReactText, useContext, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RootComponent from './components/RootComponent';
import RowComponent from './components/RowComponent';
import customDataTypes from './customDataTypes';
import styles from './styles';
import './styles.css';
import { IColumnSettings, IProps, IRow } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент таблицы для отображения всех заданий у пользователя
 * @param history история в браузере
 * @param match передаваемые параметры в адресную строку
 * @constructor
 */
const TasksTable: FC<IProps> = ({ history, match }): JSX.Element => {
  const classes = useStyles();

  const { filter } = match.params;

  const context = useContext<IContext>(Context);

  const { documentTitle, updateDashBoardTitle, openSnackbar } = context;

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

  const [settings] = useState<IColumnSettings>(tableSettings);

  const { rows, filters, sorting, pageSizes, pageSize, totalCount, currentPage } = table;

  const {
    columns, sortingStateColumnExtensions, defaultOrder, filteringStateColumnExtensions,
    columnsExtensions,
  } = settings;

  /**
   * Фугкция изменения сортировок
   * @param sorting массив сортировок
   */
  const changeSorting = (sorting: Sorting[]): void => (
    setTable({ ...table, sorting })
  );

  /**
   * Метод для обработки изменения числа строк на странице
   * @param pageSize размер страницы
   */
  const changePageSize = (pageSize: number): void => (
    setTable({ ...table, pageSize, currentPage: 0 })
  );

  /**
   * Функция обработки изменения текущей страницы
   * @param currentPage номер текущей страницы
   */
  const changeCurrentPage = (currentPage: number): void => (
    setTable({ ...table, currentPage })
  );

  /**
   * Функция изменения фильтров
   * @param filters массив фильтров
   */
  const changeFilters = (filters: Filter[]): void => setTable({ ...table, filters });

  /**
   * Функция для выдачи фильтра в зависимости от параметра в урле
   * @param filter
   */
  const taskFilter = (filter: 'completed' | 'in-process'): boolean => filter === 'completed';

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  const loadData = (): void => {
    setLoading(true);
    const config: IGetConfig = {
      // Параметры для пагинации
      limit: pageSize,
      offset: currentPage! * pageSize!,
    };
    // В зависимости от выбранного пункта меню фильтруем список заданий
    config.done = taskFilter(filter);
    // Параметры для фильтрации
    filters!.map(({ operation, columnName, value }: Filter): void => {
      if (operation) {
        config[tasksFilterLookUps[columnName] + filteringParams[operation]] = value;
      }
      return undefined;
    });
    // Параметры для сортировки
    sorting!.map(({ direction, columnName }: Sorting): void => {
      config.ordering = sortingParams[direction] + tasksSortingLookUps[columnName];
      return undefined;
    });
    api.getContent<IApiResponse<IRow>>('task-table', config, TASKS_APP)
      .then((response: AxiosResponse<IApiResponse<IRow>>): void => {
        const { results, count } = response.data;
        setTable({ ...table, rows: results, totalCount: count });
        setLoading(false);
      })
      .catch((error: AxiosError): void => {
        let message: string = SERVER_NOT_AVAILABLE;
        if (error.response) {
          const { status } = error.response;
          // Если пришёл ответ Unauthorized, то разлогиниваем пользователя
          if (status === 401) {
            auth.logout().finally((): void => history.push({ pathname: '/' }));
          }
          message = SERVER_RESPONSES[status];
        }
        openSnackbar!('error', message);
        setLoading(false);
      });
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = (): void => updateDashBoardTitle!(DASH_BOARD_TITLES[filter]);

  /**
   * Функция получения уникального идентификатора строки
   * @param row строка
   */
  const getRowId = (row: IRow): ReactText => row.id!;

  useEffect(loadData, [currentPage, pageSize, filters, sorting, filter]);

  useEffect(setDashBoardTitle, [filter]);

  useEffect(
    (): void => {
      document.title = `${documentTitle} | Мои задания`;
    },
    [documentTitle],
  );

  return (
    <ReactCSSTransitionGroup
      transitionName="task-table"
      transitionEnter={false}
      transitionLeave={false}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <Paper className={classes.paper}>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          rootComponent={RootComponent}
        >
          {customDataTypes.map((props: ICustomDataTypeProviderProps) => (
            <DataTypeProvider {...props} />
          ))}
          <DragDropProvider />
          <SortingState
            sorting={sorting}
            onSortingChange={changeSorting}
            columnExtensions={sortingStateColumnExtensions}
          />
          <PagingState
            currentPage={currentPage}
            pageSize={pageSize}
            onPageSizeChange={changePageSize}
            onCurrentPageChange={changeCurrentPage}
          />
          <CustomPaging
            totalCount={totalCount}
          />
          <FilteringState
            filters={filters}
            onFiltersChange={changeFilters}
            columnExtensions={filteringStateColumnExtensions}
          />
          <VirtualTable
            height="auto"
            messages={tableMessages}
            rowComponent={RowComponent}
            columnExtensions={columnsExtensions}
          />
          <TableColumnReordering
            defaultOrder={defaultOrder}
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
            pageSizes={pageSizes}
            messages={pagingPanelMessages}
          />
        </Grid>
        {loading && <Loading />}
      </Paper>
    </ReactCSSTransitionGroup>
  );
};

export default TasksTable;
