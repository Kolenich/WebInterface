import React, { ComponentState, PureComponent, ReactElement, ReactNode } from 'react';
import { WithStyles, Paper, Fab, Dialog } from '@material-ui/core';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import api from '../../lib/api';
import { Employee, ModalProps } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import { dateOptions, sexLabel } from '../../lib/utils';
import columnSettings from '../MainMenu/columnSettings';
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
import EditEmployee from './EditEmployee';
import { Add } from '@material-ui/icons';

interface Props extends WithStyles<typeof styles> {
}

interface State {
  employees: Employee[];
  rows: TableRows[];
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

interface EditEmployeeProps extends ModalProps {
  form: ReactElement<typeof EditEmployee>;
}

// Компонент модального окна
const EditingFormModal = (props: EditEmployeeProps): ReactElement<ReactNode> => (
  <Dialog open={props.open} onClose={props.onClose} scroll="paper">
    {props.form}
  </Dialog>
);

class EmployeeTable extends PureComponent<Props, State> {
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
      <Fab color="primary" className={classes.addIcon}
           onClick={this.openEditWindow(-1, true)}>
        <Add/>
      </Fab>
    );
  }

  // Компонент строки в таблице
  TableRow = (props: Table.DataRowProps): ReactElement<ReactNode> => {
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

  private openEditWindow =
    (rowId: number, addEmployee: boolean) => (): ComponentState => {
      this.setState({ rowId, addEmployee });
    }

  private closeEditWindow = (): ComponentState => {
    this.setState({ addEmployee: false });
  }

  private updateTable = (data: Employee) => {
    const { employees } = { ...this.state };
    const employee: Employee | undefined = employees.find(x => x.id === data.id);
    if (employee) {
      employees[employees.indexOf(employee)] = data;
    } else {
      employees.push(data);
    }
    const rows: TableRows[] = this.formTableData(employees);
    this.setState({ employees, rows });
  }

  private deleteRecord = (id: number): ComponentState => {
    const { employees } = { ...this.state };
    const employee: Employee | undefined = employees.find(x => x.id === id);
    if (employee) {
      employees.splice(employees.indexOf(employee), 1);
      const rows: TableRows[] = this.formTableData(employees);
      this.setState({ employees, rows });
    }
  }

  // Метод для обработки изменения числа строк на странице
  private changePageSize = (defaultPageSize: number): ComponentState => {
    this.setState({ defaultPageSize });
  }

  private formTableData = (employees: Employee[]): TableRows[] => {
    const rows: TableRows[] = [];
    // eslint-disable-next-line
    employees.map((employee: Employee): void => {
      const fullName: string = employee.middle_name ?
        `${employee.last_name} ${employee.first_name} ${employee.middle_name}` :
        `${employee.last_name} ${employee.first_name}`;
      const registrationDate: string =
        new Date(employee.registration_date).toLocaleDateString('ru', dateOptions);
      const phone: string = employee.phone !== null ? employee.phone : 'Не указан';
      const email: string = employee.email;
      const age: number = employee.age;
      const dateOfBirth: string =
        new Date(employee.date_of_birth).toLocaleDateString('ru', dateOptions);
      const sex: string = sexLabel[employee.sex];
      const id: number = employee.id ? employee.id : 0;
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
      addEmployee,
      rowId,
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
        <EditingFormModal
          open={addEmployee}
          onClose={this.closeEditWindow}
          form={
            <EditEmployee
              id={rowId}
              closeForm={this.closeEditWindow}
              updateTable={this.updateTable}
              deleteRecord={this.deleteRecord}
            />
          }
        />
        <this.AddButton/>
      </Paper>
    );
  }
}

export default withStyles(styles)(EmployeeTable);
