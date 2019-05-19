import React, { ChangeEvent, Component, ComponentState, ReactNode } from 'react';
import { WithStyles, AppBar, Tabs, Tab } from '@material-ui/core';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import api from '../../lib/api';
import { Employee } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Locales } from '../../lib/utils';
import EmployeeTable from '../EmployeeTable';

interface Props extends WithStyles<typeof styles> {
}

interface State {
  employees: Employee[];
  locale: Locales;
  value: number;
}

class MainMenu extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      employees: [],
      locale: 'ru',
      value: 0,
    };
  }

  componentDidMount(): ComponentState {
    api.getContent<Employee[]>('employees')
      .then((response: AxiosResponse<Employee[]>) => {
        const employees: Employee[] = response.data;
        this.setState({ employees });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  handleChange = (event: ChangeEvent<{}>, value: number) => {
    this.setState({ value });
  }

  public render(): ReactNode {
    const { value } = this.state;
    return (
      <>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            centered
          >
            <Tab label="Сотрудники"/>
            <Tab label="Организации"/>
          </Tabs>
        </AppBar>
        {value === 0 && <EmployeeTable/>}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
