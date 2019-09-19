import {
  ChangeSet,
  CustomPaging,
  DataTypeProvider,
  EditingState,
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
  TableColumnResizing,
  TableEditColumn,
  TableEditRow,
  TableFilterRow,
  TableFixedColumns,
  TableHeaderRow,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import api from 'lib/api';
import auth from 'lib/auth';
import Loading from 'lib/generic/Loading';
import Snackbar from 'lib/generic/Snackbar';
import { REST_API } from 'lib/session';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableEditColumnMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import { IApiResponse, IEmployee, IGetConfig, ISnackbarProps, ITableRow } from 'lib/types';
import { filteringParams, SERVER_RESPONSES, sortingParams } from 'lib/utils';
import React, { FunctionComponent, ReactText, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import columnSettings from './columnSettings';
import CommandComponent from './components/CommandComponent';
import EditCellComponent from './components/EditCellComponent';
import RootComponent from './components/RootComponent';
import customDataTypes from './customDataTypes';
import { styles } from './styles';
import './styles.css';
import { IColumnSettings, ICustomDataTypeProviderProps, IProps, ITable } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент таблицы сотрудников
 * @param history история в браузере
 * @param classes классы CSS
 * @constructor
 */
const EmployeeTable: FunctionComponent<IProps> = ({ history }: IProps): JSX.Element => {
  const classes = useStyles();
  // Переменные состояния основной таблицы
  const [table, setTable] = useState<ITable>({
    rows: [],
    filters: [],
    sorting: [],
    pageSizes: [5, 10, 20],
    pageSize: 5,
    totalCount: 0,
    currentPage: 0,
  });

  // Переменная состояния загрузки
  const [loading, setLoading] = useState<boolean>(false);

  // Переменные состояния снэкбара
  const [snackbar, setSnackbar] = useState<ISnackbarProps>({
    open: false,
    variant: 'info',
    message: '',
  });

  // Переменные состояния настроек таблицы
  const [settings] = useState<IColumnSettings>(columnSettings);

  const { rows, filters, sorting, pageSizes, pageSize, totalCount, currentPage } = table;

  const {
    leftFixedColumns, rightFixedColumns, defaultColumnWidths, sortingStateColumnExtensions,
    editingStateColumnExtensions, defaultOrder, columns,
  } = settings;

  /**
   * Функция обработки неуспешного ответа с сервера
   * @param error объект ответа
   */
  const handleError = (error: AxiosError): void => {
    let message: string = 'Сервер не доступен, попробуйте позже';
    if (error.response) {
      const { status } = error.response;
      // Если пришёл ответ Unauthorized, то разлогиниваем пользователя
      if (status === 401) {
        auth.logout()
          .then((): void => history.push({ pathname: '/' }))
          .catch((): void => history.push({ pathname: '/' }));
      }
      message = SERVER_RESPONSES[status];
    }
    setSnackbar({ ...snackbar, message, open: true, variant: 'error' });
    setLoading(false);
  };

  /**
   * Функция обработки успешного ответа с сервера
   * @param response объект ответа
   */
  const handleSuccess = (response: AxiosResponse): void => {
    setSnackbar({
      ...snackbar,
      open: true,
      message: SERVER_RESPONSES[response.status],
      variant: 'success',
    });
    loadData();
  };

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  const loadData = (): void => {
    const config: IGetConfig = {
      // Параметры для пагинации
      limit: pageSize,
      offset: currentPage * pageSize,
    };
    // Параметры для фильтрации
    filters.map(({ operation, columnName, value }: Filter): void => {
      if (operation) {
        config[columnName + filteringParams[operation]] = value;
      }
      return undefined;
    });
    // Параметры для сортировки
    sorting.map(({ direction, columnName }: Sorting): void => {
      config.ordering = sortingParams[direction] + columnName;
      return undefined;
    });
    api.getContent<IApiResponse<ITableRow>>('employee-table', config)
      .then((response: AxiosResponse<IApiResponse<ITableRow>>): void => {
        const { results, count } = response.data;
        setTable({ ...table, rows: results, totalCount: count });
        setLoading(false);
      })
      .catch(handleError);
  };

  /**
   * Метод для обработки изменения числа строк на странице
   * @param pageSize размер страницы
   */
  const changePageSize = (pageSize: number): void => {
    setTable({ ...table, pageSize, currentPage: 0 });
    setLoading(true);
  };

  /**
   * Функция обработки изменения текущей страницы
   * @param currentPage номер текущей страницы
   */
  const changeCurrentPage = (currentPage: number): void => {
    setTable({ ...table, currentPage });
    setLoading(true);
  };

  /**
   * Функция изменения фильтров
   * @param filters массив фильтров
   */
  const changeFilters = (filters: Filter[]): void => {
    setTable({ ...table, filters });
    setLoading(true);
  };

  /**
   * Фугкция изменения сортировок
   * @param sorting массив сортировок
   */
  const changeSorting = (sorting: Sorting[]): void => {
    setTable({ ...table, sorting });
    setLoading(true);
  };

  /**
   * Функция получения уникального идентификатора строки
   * @param row строка
   */
  const getRowId = (row: ITableRow): ReactText => row.id;

  /**
   * Функция, закрывающая снэкбар
   */
  const closeSnackbar = (): void => setSnackbar({ ...snackbar, open: false });

  /**
   * Функция подтверждения изменений
   * @param added массив добавленных строк
   * @param changed массив изменённых строк
   * @param deleted массив id удалённых строк
   */
  const commitChanges = ({ added, changed, deleted }: ChangeSet): void => {
    setLoading(true);
    if (added && added.length) {
      const data: Partial<IEmployee> = added[0];
      api.sendContent('employee', data, REST_API, 'post')
        .then(handleSuccess)
        .catch(handleError);
    }
    if (changed) {
      const id: ReactText = Object.keys(changed)[0];
      const data: Partial<IEmployee> = changed[id];
      api.sendContent(`employee/${id}`, data, REST_API, 'patch')
        .then(handleSuccess)
        .catch(handleError);
    }
    if (deleted && deleted.length) {
      const id: ReactText = deleted[0];
      api.sendContent(`employee/${id}`, {}, REST_API, 'delete')
        .then(handleSuccess)
        .catch(handleError);
    }
  };

  useEffect(
    loadData,
    [currentPage, pageSize, filters, sorting],
  );

  useEffect(
    () => {
      document.title = 'Сотрудники';
    },
    [],
  );

  console.log('render');

  return (
    <ReactCSSTransitionGroup
      transitionName="table"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Snackbar {...snackbar} onClose={closeSnackbar} />
      <Paper
        className={classes.paper}
      >
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
            onFiltersChange={changeFilters}
          />
          <EditingState
            onCommitChanges={commitChanges}
            columnExtensions={editingStateColumnExtensions}
          />
          <VirtualTable
            height="auto"
            messages={tableMessages}
          />
          <TableColumnReordering
            defaultOrder={defaultOrder}
          />
          <TableColumnResizing
            defaultColumnWidths={defaultColumnWidths}
          />
          <TableHeaderRow
            showSortingControls
            messages={tableHeaderRowMessage}
          />
          <TableFilterRow
            showFilterSelector
            messages={filterRowMessages}
          />
          <TableEditRow
            cellComponent={EditCellComponent}
          />
          <TableEditColumn
            showAddCommand
            showDeleteCommand
            showEditCommand
            commandComponent={CommandComponent}
            messages={tableEditColumnMessages}
          />
          <TableFixedColumns
            leftColumns={leftFixedColumns}
            rightColumns={rightFixedColumns}
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

export default EmployeeTable;
