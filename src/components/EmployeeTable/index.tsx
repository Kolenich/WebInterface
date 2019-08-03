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
  TableColumnResizing,
  TableFilterRow,
  TableHeaderRow,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { IconButton, LinearProgress, Paper, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Create } from '@material-ui/icons';
import { AxiosResponse } from 'axios';
import React, { ComponentState, PureComponent, ReactNode } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import api from '../../lib/api';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from '../../lib/translate';
import { IApiResponse, IDRFGetConfig, ITableRow } from '../../lib/types';
import { filteringParams, sortingParams } from '../../lib/utils';
import EmployeeForm from '../EmployeeForm';
import columnSettings from './columnSettings';
import AddButton from './components/AddButton';
import DateEditorComponent from './components/DateEditorComponent';
import DateTypeProvider from './components/DateFormatter';
import DateTimeEditorComponent from './components/DateTimeEditorComponent';
import DateTimeTypeProvider from './components/DateTimeFormatter';
import FilterCellComponent from './components/FilterCellComponent';
import ImageTypeProvider from './components/ImageFormatter';
import NumberEditorComponent from './components/NumberEditorComponent';
import RootComponent from './components/RootComponent';
import SexEditorComponent from './components/SexEditorComponent';
import SexTypeProvider from './components/SexFormatter';
import TextEditorComponent from './components/TextEditorComponent';
import { styles } from './styles';
import './styles.css';
import { IProps, IState } from './types';

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
      rowId: -1,
      addEmployee: false,
      loading: false,
    };
  }

  /**
   * Метод, вызываемый после монтирования компонента
   */
  public componentDidMount(): ComponentState {
    this.loadData();
  }

  /**
   * Метод, вызываемый после обновления компонента
   * @param prevProps предыдущие пропсы
   * @param prevState предыдущее состояние
   */
  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>):
    ComponentState {
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
   * Компонент для иконок под разные статусы
   */
  iconFormatter = (props: DataTypeProvider.ValueFormatterProps) => {
    const { id } = props.row;
    return (
      <Tooltip title="Редактировать">
        <IconButton onClick={this.openEditWindow(id)}>
          <Create />
        </IconButton>
      </Tooltip>
    );
  }

  /**
   * Компонент, предоставляющий тип для иконок под разные статусы
   */
  iconTypeProvider = (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={this.iconFormatter}
      {...props}
    />
  )

  /**
   * Метод для загрузи данных в таблицу с сервера
   */
  private loadData = (): ComponentState => {
    const { currentPage, pageSize, filters, sorting } = this.state;
    const config: IDRFGetConfig = {
      params: {
        // Параметры для пагинации
        limit: pageSize,
        offset: currentPage * pageSize,
      },
    };
    // Параметры для фильтрации
    filters.map((filter: Filter): void => {
      if (filter.operation) {
        config.params[`${filter.columnName}${filteringParams[filter.operation]}`] = filter.value;
      }
      return undefined;
    });
    // Параметры для сортировки
    sorting.map((sort: Sorting) => {
      config.params.ordering = `${sortingParams[sort.direction]}${sort.columnName}`;
      return undefined;
    });
    api.getContent<IApiResponse<ITableRow>>('employee-table', config)
      .then((response: AxiosResponse<IApiResponse<ITableRow>>): ComponentState => {
        const { results, count } = response.data;
        this.setState((state: IState) => (
          { ...state, rows: results, totalCount: count, loading: false }
        ));
      })
      .catch(() => {
        this.setState((state: IState) => ({ ...state, loading: false }));
      });
  }

  /**
   * Колбэк-метод, открывающий модальное окно
   * @param rowId id сотрудника
   */
  private openEditWindow = (rowId: number) => (): ComponentState => {
    this.setState((state: IState) => ({ ...state, rowId, addEmployee: true }));
  }

  /**
   * Колбэк-метод, закрывающий модальное окно
   */
  private closeEditWindow = (): ComponentState => {
    this.setState((state: IState) => ({ ...state, rowId: -1, addEmployee: false }));
  }

  /**
   * Метод для обработки изменения числа строк на странице
   * @param pageSize
   */
  private changePageSize = (pageSize: number): ComponentState => {
    this.setState((state: IState) => ({ ...state, pageSize, loading: true, currentPage: 0 }));
  }

  /**
   * Функция обработки изменения текущей страницы
   * @param currentPage номер текущей страницы
   */
  private changeCurrentPage = (currentPage: number): ComponentState => {
    this.setState((state: IState) => ({ ...state, currentPage, loading: true }));
  }

  /**
   * Функция изменения фильтров
   * @param filters массив фильтров
   */
  private changeFilters = (filters: Filter[]): ComponentState => {
    this.setState((state: IState) => ({ ...state, filters, loading: true }));
  }

  /**
   * Фугкция изменения сортировок
   * @param sorting массив сортировок
   */
  private changeSorting = (sorting: Sorting[]): ComponentState => {
    this.setState((state: IState) => ({ ...state, sorting, loading: true }));
  }

  /**
   * Функция получения уникального идентификатора строки
   * @param row строка
   */
  private getRowId = (row: ITableRow) => row.id;

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    const {
      rows,
      columns,
      defaultOrder,
      defaultColumnWidths,
      pageSizes,
      pageSize,
      addEmployee,
      rowId,
      loading,
      totalCount,
      currentPage,
      sortingStateColumnExtensions,
      sorting,
      dateColumns,
      sexColumns,
      dateTimeColumns,
      avatarColumns,
      buttonColumns,
      textFilterOperations,
      numberFilterOperations,
      dateFilterOperations,
      dateTimeFilterOperations,
      sexFilterOperations,
      textFilterColumns,
      numberFilterColumns,
    } = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="table"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Paper className={classes.paper}>
          <Grid
            rows={rows}
            columns={columns}
            getRowId={this.getRowId}
            rootComponent={RootComponent}
          >
            <DataTypeProvider
              for={textFilterColumns}
              availableFilterOperations={textFilterOperations}
              editorComponent={TextEditorComponent}
            />
            <DataTypeProvider
              for={numberFilterColumns}
              availableFilterOperations={numberFilterOperations}
              editorComponent={NumberEditorComponent}
            />
            <DateTypeProvider
              for={dateColumns}
              availableFilterOperations={dateFilterOperations}
              editorComponent={DateEditorComponent}
            />
            <DateTimeTypeProvider
              for={dateTimeColumns}
              availableFilterOperations={dateTimeFilterOperations}
              editorComponent={DateTimeEditorComponent}
            />
            <SexTypeProvider
              for={sexColumns}
              availableFilterOperations={sexFilterOperations}
              editorComponent={SexEditorComponent}
            />
            <ImageTypeProvider for={avatarColumns} />
            <this.iconTypeProvider for={buttonColumns} />
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
              cellComponent={FilterCellComponent}
            />
            <PagingPanel
              pageSizes={pageSizes}
              messages={pagingPanelMessages}
            />
          </Grid>
          {loading && <LinearProgress />}
        </Paper>
        <AddButton tooltip="Создать" onClick={this.openEditWindow(-1)} />
        <EmployeeForm
          id={rowId}
          open={addEmployee}
          onClose={this.closeEditWindow}
          updateTable={this.loadData}
        />
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(EmployeeTable);
