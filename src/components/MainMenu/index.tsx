import React, { ChangeEvent, Component, ComponentState, ReactNode } from 'react';
import { AppBar, Tabs, Tab, withStyles, Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { styles } from './styles';
import api from '../../lib/api';
import { Employee } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import EmployeeTable from '../EmployeeTable';
import { Props, State, TabContainerProps } from './types';

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

  TabContainer = ({ children, dir }: TabContainerProps) => {
    const { classes } = this.props;
    return (
      <Typography component="div" dir={dir} classes={{ root: classes.tabContainer }}>
        {children}
      </Typography>
    );
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
          <this.TabContainer dir={theme.direction}>
            <EmployeeTable/>
          </this.TabContainer>
          <this.TabContainer dir={theme.direction}>
            Привет
          </this.TabContainer>
        </SwipeableViews>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
