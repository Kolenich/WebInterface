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
import { withStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import api from 'lib/api';
import auth from 'lib/auth';
import Loading from 'lib/generic/Loading';
import Snackbar from 'lib/generic/Snackbar';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableEditColumnMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import { IApiResponse, IDRFGetConfig, IEmployee, ITableRow } from 'lib/types';
import { filteringParams, SERVER_RESPONSES, sortingParams } from 'lib/utils';
import React, { PureComponent, ReactNode, ReactText } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { REST_API } from '../../lib/session';
import columnSettings from './columnSettings';
import CommandComponent from './components/CommandComponent';
import EditCellComponent from './components/EditCellComponent';
import RootComponent from './components/RootComponent';
import customDataTypes from './customDataTypes';
import { styles } from './styles';
import './styles.css';
import { ICustomDataTypeProviderProps, IProps, IState } from './types';

/**
 * Компонент таблицы Сотрудников
 */
class EmployeeTable extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    document.title = 'Сотрудники';
    this.state = {
      ...columnSettings,
      rows: [],
      filters: [],
      sorting: [],
      pageSizes: [5, 10, 20],
      pageSize: 5,
      totalCount: 0,
      currentPage: 0,
      loading: false,
      snackbarOpen: false,
      snackbarVariant: 'info',
      snackbarMessage: '',
    };
  }

  /**
   * Метод, вызываемый после монтирования компонента
   */
  public componentDidMount(): void {
    this.loadData();
  }

  /**
   * Метод, вызываемый после обновления компонента
   * @param prevProps предыдущие пропсы
   * @param prevState предыдущее состояние
   */
  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
    const { pageSize, currentPage, filters, sorting } = this.state;
    if (
      prevState.currentPage !== currentPage ||
      prevState.pageSize !== pageSize ||
      prevState.filters !== filters ||
      prevState.sorting !== sorting
    ) {
      this.loadData();
    }
  }

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  private loadData = (): void => {
    const { currentPage, pageSize, filters, sorting } = this.state;
    const config: IDRFGetConfig = {
      params: {
        // Параметры для пагинации
        limit: pageSize,
        offset: currentPage * pageSize,
      },
    };
    // Параметры для фильтрации
    filters.map(({ operation, columnName, value }: Filter): void => {
      if (operation) {
        config.params[columnName + filteringParams[operation]] = value;
      }
      return undefined;
    });
    // Параметры для сортировки
    sorting.map(({ direction, columnName }: Sorting): void => {
      config.params.ordering = sortingParams[direction] + columnName;
      return undefined;
    });
    api.getContent<IApiResponse<ITableRow>>('employee-table', config)
      .then((response: AxiosResponse<IApiResponse<ITableRow>>): void => {
        const { results, count } = response.data;
        this.setState((state: IState) => (
          { ...state, rows: results, totalCount: count, loading: false }
        ));
      })
      .catch(this.handleError);
  }

  /**
   * Функция обработки успешного ответа с сервера
   * @param response объект ответа
   */
  private handleSuccess = (response: AxiosResponse): void => {
    this.setState((state: IState) => ({
      ...state,
      snackbarOpen: true,
      snackbarMessage: SERVER_RESPONSES[response.status],
      snackbarVariant: 'success',
    }));
    this.loadData();
  }

  /**
   * Функция обработки неуспешного ответа с сервера
   * @param error объект ответа
   */
  private handleError = (error: AxiosError): void => {
    let snackbarMessage: string = 'Сервер не доступен, попробуйте позже';
    if (error.response) {
      const { status } = error.response;
      // Если пришёл ответ Unauthorized, то разлогиниваем пользователя
      if (status === 401) {
        const { history } = this.props;
        auth.logout()
          .then(() => history.push({ pathname: '/' }))
          .catch(() => history.push({ pathname: '/' }));
      }
      snackbarMessage = SERVER_RESPONSES[status];
    }
    this.setState((state: IState) => ({
      ...state,
      snackbarMessage,
      loading: false,
      snackbarOpen: true,
      snackbarVariant: 'error',
    }));
  }

  /**
   * Метод для обработки изменения числа строк на странице
   * @param pageSize размер страницы
   */
  private changePageSize = (pageSize: number): void => (
    this.setState((state: IState) => ({ ...state, pageSize, loading: true, currentPage: 0 }))
  )

  /**
   * Функция обработки изменения текущей страницы
   * @param currentPage номер текущей страницы
   */
  private changeCurrentPage = (currentPage: number): void => (
    this.setState((state: IState) => ({ ...state, currentPage, loading: true }))
  )

  /**
   * Функция изменения фильтров
   * @param filters массив фильтров
   */
  private changeFilters = (filters: Filter[]): void => (
    this.setState((state: IState) => ({ ...state, filters, loading: true }))
  )

  /**
   * Фугкция изменения сортировок
   * @param sorting массив сортировок
   */
  private changeSorting = (sorting: Sorting[]): void => (
    this.setState((state: IState) => ({ ...state, sorting, loading: true }))
  )

  /**
   * Функция получения уникального идентификатора строки
   * @param row строка
   */
  private getRowId = (row: ITableRow) => row.id;

  /**
   * Функция, закрывающая снэкбар
   */
  private closeSnackbar = (): void => (
    this.setState((state: IState) => ({ ...state, snackbarOpen: false }))
  )

  /**
   * Функция подтверждения изменений
   * @param added массив добавленных строк
   * @param changed массив изменённых строк
   * @param deleted массив id удалённых строк
   */
  private commitChanges = ({ added, changed, deleted }: ChangeSet): void => {
    this.setState((state: IState) => ({ ...state, loading: true }));
    if (added && added.length) {
      const data: Partial<IEmployee> = added[0];
      api.sendContent('employee', data, REST_API, 'post')
        .then(this.handleSuccess)
        .catch(this.handleError);
    }
    if (changed) {
      const id: ReactText = Object.keys(changed)[0];
      const data: Partial<IEmployee> = changed[id];
      api.sendContent(`employee/${id}`, data, REST_API, 'patch')
        .then(this.handleSuccess)
        .catch(this.handleError);
    }
    if (deleted && deleted.length) {
      const id: ReactText = deleted[0];
      api.sendContent(`employee/${id}`, {}, REST_API, 'delete')
        .then(this.handleSuccess)
        .catch(this.handleError);
    }
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    const {
      rows, columns, defaultOrder, defaultColumnWidths, pageSizes, pageSize, loading, totalCount,
      currentPage, sortingStateColumnExtensions, sorting, snackbarOpen, snackbarVariant,
      snackbarMessage, leftFixedColumns, editingStateColumnExtensions, rightFixedColumns,
    } = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="table"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Snackbar
          open={snackbarOpen}
          variant={snackbarVariant}
          message={snackbarMessage}
          onClose={this.closeSnackbar}
        />
        <Paper
          className={classes.paper}
        >
          <Grid
            rows={rows}
            columns={columns}
            getRowId={this.getRowId}
            rootComponent={RootComponent}
          >
            {customDataTypes.map((props: ICustomDataTypeProviderProps) => (
              <DataTypeProvider {...props} />
            ))}
            <DragDropProvider />
            <SortingState
              sorting={sorting}
              onSortingChange={this.changeSorting}
              columnExtensions={sortingStateColumnExtensions}
            />
            <PagingState
              currentPage={currentPage}
              pageSize={pageSize}
              onPageSizeChange={this.changePageSize}
              onCurrentPageChange={this.changeCurrentPage}
            />
            <CustomPaging
              totalCount={totalCount}
            />
            <FilteringState
              onFiltersChange={this.changeFilters}
            />
            <EditingState
              onCommitChanges={this.commitChanges}
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
  }
}

export default withStyles(styles)(EmployeeTable);
