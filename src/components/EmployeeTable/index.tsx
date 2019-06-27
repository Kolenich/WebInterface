import React, { ChangeEvent, ComponentState, PureComponent, ReactNode } from 'react';
import {
  Fab,
  FormControl, Input,
  InputLabel,
  LinearProgress, MenuItem,
  Paper, Select,
  Tooltip,
} from '@material-ui/core';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import api from '../../lib/api';
import { DRFGetConfig, ApiResponse, TableRow, Sex } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import columnSettings from './columnSettings';
import {
  GroupingState,
  IntegratedGrouping,
  PagingState,
  FilteringState,
  SortingState,
  CustomPaging, Filter, Sorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
  TableColumnResizing,
  TableGroupRow,
  GroupingPanel,
  Toolbar,
  PagingPanel,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
  filterRowMessages,
  groupByMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from '../../lib/translate';
import EmployeeForm from '../EmployeeForm';
import { Add } from '@material-ui/icons';
import { Props, State } from './types';
import { dateOptions, dateTimeOptions, sortingParams } from '../../lib/utils';

const sexParams: string[] = ['Муж.', 'Жен.'];

class EmployeeTable extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...columnSettings,
      sex: '',
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

  public componentDidMount(): ComponentState {
    this.loadData();
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>):
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

  filterCellComponent = (props: TableFilterRow.CellProps, sex: Sex) => {
    if (props.column.name !== 'sex') {
      return (
        <TableFilterRow.Cell {...props}/>
      );
    }
    return (
      <TableFilterRow.Cell{...props}>
        <FormControl fullWidth>
          <InputLabel>Фильтр...</InputLabel>
          <Select
            value={sex}
            input={<Input/>}
            onChange={
              (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
                let value: string = '';
                const columnName: string = props.column.name;
                const operation: string = 'startswith';
                if (event.target.value === 'Муж.') value = 'male';
                if (event.target.value === 'Жен.') value = 'female';
                const filter: Filter = { value, columnName, operation };
                props.onFilter(filter);
                this.setState({ sex: event.target.value as Sex });
              }
            }
          >
            <MenuItem value=""><em>Сброс</em></MenuItem>
            {sexParams.map((value: string) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableFilterRow.Cell>
    );
  }

  private loadData = (): ComponentState => {
    const { currentPage, pageSize, filters, sorting } = this.state;
    const config: DRFGetConfig = {
      params: {
        // Параметры для пагинации
        limit: pageSize,
        offset: currentPage * pageSize,
      },
    };
    // Параметры для фильтрации
    // eslint-disable-next-line
    filters.map((filter: Filter): void => {
      config.params[`${filter.columnName}__${filter.operation}`] = filter.value;
    });
    // Параметры для сортировки
    // eslint-disable-next-line
    sorting.map((sort: Sorting) => {
      config.params.ordering = `${sortingParams[sort.direction]}${sort.columnName}`;
    });
    api.getContent<ApiResponse<TableRow>>('employees-table', config)
      .then((response: AxiosResponse<ApiResponse<TableRow>>): ComponentState => {
        const rows: TableRow[] = response.data.results;
        // eslint-disable-next-line
        rows.map((row: TableRow): void => {
          // Преобразвание даты в читабельный вид
          row.registration_date =
            new Date(row.registration_date).toLocaleDateString('ru', dateTimeOptions);
          row.date_of_birth = new Date(row.date_of_birth).toLocaleString('ru', dateOptions);
        });
        const totalCount: number = response.data.count;
        this.setState({ rows, totalCount, loading: false });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  // Кнопка для добавления нового сотрудника
  AddButton = (): JSX.Element => {
    const { classes } = this.props;
    return (
      <Tooltip title="Создать">
        <Fab color="primary" className={classes.addIcon} variant="extended"
             onClick={this.openEditWindow(-1, true)}>
          <Add/>
          Создать
        </Fab>
      </Tooltip>
    );
  }

  // Компонент строки в таблице
  RowComponent = (props: Table.DataRowProps): JSX.Element => {
    const { classes } = this.props;
    const rowId: number = props.row.id;
    const addEmployee: boolean = true;
    return (
      <Table.Row
        {...props}
        className={classes.rowCursor}
        onClick={this.openEditWindow(rowId, addEmployee)}
      />);
  }

  // Колбэк-метод, открывающий модальное окно
  private openEditWindow = (rowId: number, addEmployee: boolean) => (): ComponentState => {
    this.setState({ rowId, addEmployee });
  }

  // Колбэк-метод, закрывающий модальное окно
  private closeEditWindow = (): ComponentState => {
    this.setState({ addEmployee: false });
  }

  // Метод для обработки изменения числа строк на странице
  private changePageSize = (pageSize: number): ComponentState => {
    this.setState({ pageSize, loading: true, currentPage: 0 });
  }

  /**
   * Функция обработки изменения текущей страницы
   * @param currentPage номер текущей страницы
   */
  private changeCurrentPage = (currentPage: number): ComponentState => {
    this.setState({ currentPage, loading: true });
  }

  /**
   * Фугкция изменения фильтров
   * @param filters массив фильтров
   */
  private changeFilters = (filters: Filter[]): ComponentState => {
    this.setState({ filters, loading: true });
  }

  /**
   * Фугкция изменения сортировок
   * @param sorting массив сортировок
   */
  private changeSorting = (sorting: Sorting[]): ComponentState => {
    console.log(sorting);
    this.setState({ sorting, loading: true });
  }

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
      filteringStateColumnExtensions,
      sortingStateColumnExtensions,
      sorting,
      sex,
    } = this.state;
    return (
      <Paper className={classes.paper}>
        <Grid rows={rows} columns={columns}>
          <DragDropProvider/>
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
            columnExtensions={sortingStateColumnExtensions}
          />
          <GroupingState/>
          <IntegratedGrouping/>
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
            columnExtensions={filteringStateColumnExtensions}
          />
          <Table
            rowComponent={this.RowComponent}
            messages={tableMessages}
          />
          <TableColumnReordering
            defaultOrder={defaultOrder}
          />
          <TableColumnResizing
            defaultColumnWidths={defaultColumnWidths}
          />
          <TableHeaderRow
            showGroupingControls
            showSortingControls
            messages={tableHeaderRowMessage}
          />
          <TableFilterRow
            messages={filterRowMessages}
            cellComponent={
              (props: TableFilterRow.CellProps) => this.filterCellComponent(props, sex)
            }
          />
          <TableGroupRow/>
          <Toolbar/>
          <GroupingPanel
            messages={groupByMessages}
          />
          <PagingPanel
            pageSizes={pageSizes}
            messages={pagingPanelMessages}
          />
        </Grid>
        <EmployeeForm
          id={rowId}
          open={addEmployee}
          onClose={this.closeEditWindow}
          updateTable={this.loadData}
        />
        <this.AddButton/>
        {loading && <LinearProgress/>}
      </Paper>
    );
  }
}

export default withStyles(styles)(EmployeeTable);
