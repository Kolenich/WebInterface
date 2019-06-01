import React, { ComponentState, PureComponent, ReactElement, ReactNode } from 'react';
import { Fab, Paper } from '@material-ui/core';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import api from '../../lib/api';
import { Employee } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import { dateOptions, sexLabel } from '../../lib/utils';
import columnSettings from './columnSettings';
import {
  GroupingState,
  IntegratedGrouping,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
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
  pagingPanelMessages, tableHeaderRowMessage,
  tableMessages,
} from '../../lib/translate';
import EmployeeForm from '../EmployeeForm';
import { Add } from '@material-ui/icons';
import { Props, State, TableRows } from './types';

class EmployeeTable extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...columnSettings,
      employees: [],
      pageSizes: [5, 10, 15, 25, 0],
      defaultPageSize: 10,
      rowId: -1,
      addEmployee: false,
    };
  }

  public componentDidMount(): ComponentState {
    api.getContent<Employee[]>('employees')
      .then((response: AxiosResponse<Employee[]>): ComponentState => {
        const employees: Employee[] = response.data;
        this.setState({ employees });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  // Кнопка для добавления нового сотрудника
  AddButton = (): ReactElement<ReactNode> => {
    const { classes } = this.props;
    return (
      <Fab color="primary" className={classes.addIcon} variant="extended"
           onClick={this.openEditWindow(-1, true)}>
        <Add/>
        Создать
      </Fab>
    );
  }

  // Компонент строки в таблице
  RowComponent = (props: Table.DataRowProps): ReactElement<ReactNode> => {
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
  private openEditWindow =
    (rowId: number, addEmployee: boolean) => (): ComponentState => {
      this.setState({ rowId, addEmployee });
    }

  // Колбэк-метод, закрывающий модальное окно
  private closeEditWindow = (): ComponentState => {
    this.setState({ addEmployee: false, rowId: -1 });
  }

  // Колбэк-метод для обновления или добавления строки в таблице
  private updateTable = (data: Employee) => {
    const { employees } = { ...this.state };
    const employee: Employee | undefined = employees.find(x => x.id === data.id);
    if (employee) employees[employees.indexOf(employee)] = data;
    else employees.push(data);
    this.setState({ employees });
  }

  // Колбэк-метод для удаления строки в таблице
  private deleteRecord = (id: number): ComponentState => {
    const { employees } = { ...this.state };
    const employee: Employee | undefined = employees.find(x => x.id === id);
    if (employee) {
      employees.splice(employees.indexOf(employee), 1);
      this.setState({ employees });
    }
  }

  // Метод для обработки изменения числа строк на странице
  private changePageSize = (defaultPageSize: number): ComponentState => {
    this.setState({ defaultPageSize });
  }

  // Метод, формирующий массив строк для таблицы
  private formRows = (employees: Employee[]): TableRows[] => {
    const rows: TableRows[] = [];
    // eslint-disable-next-line
    employees.map((employee: Employee): void => {
      const fullName: string = employee.middle_name ?
        `${employee.last_name} ${employee.first_name} ${employee.middle_name}` :
        `${employee.last_name} ${employee.first_name}`;
      const registrationDate: string =
        new Date(employee.registration_date).toLocaleDateString('ru', dateOptions);
      const phone: string = employee.phone !== null ?
        employee.phone :
        'Не указан';
      const email: string = employee.email;
      const age: number = employee.age;
      const dateOfBirth: string =
        new Date(employee.date_of_birth).toLocaleDateString('ru', dateOptions);
      const sex: string = sexLabel[employee.sex];
      const id: number = employee.id ?
        employee.id :
        0;
      rows.push({ id, fullName, registrationDate, phone, email, age, dateOfBirth, sex });
    });
    return rows;
  }

  public render(): ReactNode {
    const { classes } = this.props;
    const {
      employees,
      columns,
      defaultOrder,
      defaultColumnWidths,
      pageSizes,
      defaultPageSize,
      addEmployee,
      rowId,
    } = this.state;
    const rows: TableRows[] = this.formRows(employees);
    return (
      <Paper className={classes.paper}>
        <Grid rows={rows} columns={columns}>
          <DragDropProvider/>
          <SortingState/>
          <IntegratedSorting/>
          <GroupingState/>
          <IntegratedGrouping/>
          <PagingState defaultCurrentPage={0} pageSize={defaultPageSize}
                       onPageSizeChange={this.changePageSize}/>
          <IntegratedPaging/>
          <FilteringState/>
          <IntegratedFiltering/>
          <Table rowComponent={this.RowComponent} messages={tableMessages}/>
          <TableColumnReordering defaultOrder={defaultOrder}/>
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths}/>
          <TableHeaderRow showGroupingControls showSortingControls
                          messages={tableHeaderRowMessage}/>
          <TableFilterRow messages={filterRowMessages}/>
          <TableGroupRow/>
          <Toolbar/>
          <GroupingPanel messages={groupByMessages}/>
          <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages}/>
        </Grid>
        <EmployeeForm
          id={rowId}
          open={addEmployee}
          onCLose={this.closeEditWindow}
          updateTable={this.updateTable}
          deleteRecord={this.deleteRecord}
        />
        <this.AddButton/>
      </Paper>
    );
  }
}

export default withStyles(styles)(EmployeeTable);
