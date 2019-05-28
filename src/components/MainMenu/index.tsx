import React, { ChangeEvent, Component, ComponentState, ReactNode } from 'react';
import { WithStyles, AppBar, Tabs, Tab, Theme, withStyles, Paper } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { styles } from './styles';
import api from '../../lib/api';
import { Employee } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Locales } from '../../lib/utils';
import EmployeeTable from '../EmployeeTable';

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
}

interface State {
  employees: Employee[];
  locale: Locales;
  value: number;
}

interface TabContainerProps {
  children?: ReactNode;
  dir?: string;
}

const TabContainer = ({ children, dir }: TabContainerProps) => {
  return (
    <Paper component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Paper>
  );
};

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

  handleChangeIndex = (value: number): ComponentState => {
    this.setState({ value });
  }

  public render(): ReactNode {
    const { value } = this.state;
    const { theme } = this.props;
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
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <EmployeeTable/>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <EmployeeTable/>
          </TabContainer>
        </SwipeableViews>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
