import React, { Component, ComponentState, ReactElement, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import api from '../../lib/api';
import { Employee } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import { dateOptions, sexLabel } from '../../lib/utils';
import columnSettings from '../MainMenu/columnSettings';
import Paper from '@material-ui/core/Paper';
import {
  Column,
  TableColumnWidthInfo,
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
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

interface Props extends WithStyles<typeof styles> {
}

interface State {
  employees: Employee[];
  rows: TableRows[];
  rowData: Employee;
  rowId: number;
  columns: Column[];
  defaultOrder: string[];
  defaultColumnWidths: TableColumnWidthInfo[];
  pageSizes: number[];
  defaultPageSize: number;
  addEmployee: boolean;
}

interface TableRows {
  id: number;
  fullName: string;
  registrationDate: string;
  phone: string;
  email: string;
  age: number;
  dateOfBirth: string;
  sex: string;
}

const newEmployee: Employee = {
  id: -1,
  first_name: '',
  last_name: '',
  email: '',
  sex: 'male',
  middle_name: null,
  phone: null,
  attachment: null,
  age: 0,
  organization: null,
  date_of_birth: new Date(),
  registration_date: new Date(),
};

class EmployeeTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...columnSettings,
      employees: [],
      rows: [],
      pageSizes: [5, 10, 15, 25, 0],
      defaultPageSize: 10,
      rowId: 0,
      addEmployee: false,
      rowData: newEmployee,
    };
  }

  componentDidMount(): ComponentState {
    api.getContent<Employee[]>('employees')
      .then((response: AxiosResponse<Employee[]>): ComponentState => {
        const employees: Employee[] = response.data;
        const rows: TableRows[] = this.formTableData(employees);
        this.setState({ employees, rows });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  // Кнопка для добавления нового сотрудника
  AddButton = (): ReactElement<ReactNode> => {
    const { classes } = this.props;
    return (
      <Fab color="primary" className={classes.addIcon}>
        <Add/>
      </Fab>
    );
  }

  // Компонент строки в таблице
  TableRow = (props: Table.DataRowProps): ReactElement<ReactNode> => {
    const { employees } = this.state;
    const { classes } = this.props;
    const rowId: number = props.row.id;
    const addEmployee: boolean = true;
    const rowData: Employee = this.getRowDataById(employees, rowId);
    return (
      <Table.Row
        {...props}
        className={classes.rowCursor}
        onClick={this.openEditWindow(rowId, addEmployee, rowData)}
      />);
  }

  private openEditWindow =
    (rowId: number, addEmployee: boolean, rowData: Employee) => (): ComponentState => {
      this.setState({ rowId, addEmployee, rowData }, () => console.log(this.state.rowData));
    }

  // Метод для обработки изменения числа строк на странице
  private changePageSize = (defaultPageSize: number): ComponentState => {
    this.setState({ defaultPageSize });
  }

  // Метод для получения данных о сотруднике по id
  private getRowDataById = (data: Employee[], id: number): Employee => {
    const rowData: Employee | undefined = data.find(x => x.id === id);
    if (rowData) return rowData;
    return newEmployee;
  }

  private formTableData = (employees: Employee[]): TableRows[] => {
    const rows: TableRows[] = [];
    // eslint-disable-next-line
    employees.map((employee: Employee, index: number): void => {
      const fullName: string = employee.middle_name
        ? `${employee.last_name} ${employee.first_name} ${employee.middle_name}`
        : `${employee.last_name} ${employee.first_name}`;
      const registrationDate: string =
        new Date(employee.registration_date).toLocaleDateString('ru', dateOptions);
      const phone: string = employee.phone !== null ? employee.phone : 'Не указан';
      const email: string = employee.email;
      const age: number = employee.age;
      const dateOfBirth: string =
        new Date(employee.date_of_birth).toLocaleDateString('ru', dateOptions);
      const sex: string = sexLabel[employee.sex];
      const id: number = index + 1;
      rows.push({ id, fullName, registrationDate, phone, email, age, dateOfBirth, sex });
    });
    return rows;
  }

  render(): ReactNode {
    const {
      rows,
      columns,
      defaultOrder,
      defaultColumnWidths,
      pageSizes,
      defaultPageSize,
    } = this.state;
    return (
      <Paper>
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
          <Table rowComponent={this.TableRow} messages={tableMessages}/>
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
        <this.AddButton/>
      </Paper>
    );
  }
}

export default withStyles(styles)(EmployeeTable);
