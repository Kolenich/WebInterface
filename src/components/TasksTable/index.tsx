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
  TableColumnResizing,
  TableFilterRow,
  TableFixedColumns,
  TableHeaderRow,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { tableSettings, tasksCustomLookUps } from 'components/TasksTable/settings';
import api from 'lib/api';
import auth from 'lib/auth';
import Dialog from 'lib/generic/Dialog';
import Loading from 'lib/generic/Loading';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import {
  IApiResponse,
  ICustomDataTypeProviderProps,
  IDialogProps,
  IGetConfig,
  ITable,
} from 'lib/types';
import { filteringParams, SERVER_RESPONSES, sortingParams } from 'lib/utils';
import React, { FunctionComponent, ReactText, useEffect, useState } from 'react';
import { TASKS_APP } from '../../lib/session';
import RootComponent from './components/RootComponent';
import customDataTypes from './customDataTypes';
import { styles } from './styles';
import { IColumnSettings, IProps, IRow } from './types';

const useStyles = makeStyles(styles);

const TasksTable: FunctionComponent<IProps> = ({ history }): JSX.Element => {
  const classes = useStyles();

  // Переменные состояния основной таблицы
  const [table, setTable] = useState<ITable<IRow>>({
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

  // Переменные состояния диалогового окна
  const [dialog, setDialog] = useState<IDialogProps>({
    open: false,
    status: 'loading',
    message: '',
  });

  const [settings] = useState<IColumnSettings>(tableSettings);

  const { rows, filters, sorting, pageSizes, pageSize, totalCount, currentPage } = table;

  const {
    columns, sortingStateColumnExtensions, rightFixedColumns, defaultOrder, defaultColumnWidths,
    filteringStateColumnExtensions,
  } = settings;

  /**
   * Фугкция изменения сортировок
   * @param sorting массив сортировок
   */
  const changeSorting = (sorting: Sorting[]): void => {
    setTable({ ...table, sorting });
    setLoading(true);
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
   * Функция, закрывающая диалоговое окна
   */
  const closeDialog = (): void => setDialog({ ...dialog, open: false });

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
    setDialog({ ...dialog, message, open: true, status: 'error' });
    setLoading(false);
  };

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  const loadData = (): void => {
    const config: IGetConfig = {
      // Параметры для пагинации
      limit: pageSize,
      offset: currentPage! * pageSize!,
    };
    // Параметры для фильтрации
    filters!.map(({ operation, columnName, value }: Filter): void => {
      if (operation) {
        config[tasksCustomLookUps[columnName] + filteringParams[operation]] = value;
      }
      return undefined;
    });
    // Параметры для сортировки
    sorting!.map(({ direction, columnName }: Sorting): void => {
      config.ordering = sortingParams[direction] + tasksCustomLookUps[columnName];
      return undefined;
    });
    api.getContent<IApiResponse<IRow>>('task-table', config, TASKS_APP)
      .then((response: AxiosResponse<IApiResponse<IRow>>): void => {
        const { results, count } = response.data;
        setTable({ ...table, rows: results, totalCount: count });
        setLoading(false);
      })
      .catch(handleError);
  };

  /**
   * Функция получения уникального идентификатора строки
   * @param row строка
   */
  const getRowId = (row: IRow): ReactText => row.id!;

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

  return (
    <>
      <Dialog onClose={closeDialog} {...dialog} />
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
            onFiltersChange={changeFilters}
            columnExtensions={filteringStateColumnExtensions}
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
          <TableFixedColumns
            rightColumns={rightFixedColumns}
          />
          <PagingPanel
            pageSizes={pageSizes}
            messages={pagingPanelMessages}
          />
        </Grid>
        {loading && <Loading />}
      </Paper>
    </>
  );
};

export default TasksTable;
