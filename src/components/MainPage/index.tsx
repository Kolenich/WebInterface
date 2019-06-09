import React, { ChangeEvent, ComponentState, PureComponent, ReactNode } from 'react';
import { AppBar, Tabs, Tab, withStyles, Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { styles } from './styles';
import { AxiosError, AxiosResponse } from 'axios';
import EmployeeTable from '../EmployeeTable';
import { Props, State, TabContainerProps } from './types';
import { session } from '../../lib/session';

class MainPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      employees: [],
      locale: 'ru',
      value: 0,
    };
  }

  public componentDidMount(): ComponentState {
    const username: string = 'root';
    const password: string = 'root';
    session.post('auth/login/', { username, password })
      .then((response: AxiosResponse) => {
        console.log(response.data.key);
      })
      .catch((error: AxiosError) => {
        if (error.response) console.log(error.response.data);
      });
  }

  // Компонент-обертка для пункта меню
  TabContainer = ({ children, dir }: TabContainerProps): JSX.Element => {
    const { classes } = this.props;
    return (
      <Typography component="div" dir={dir} className={classes.tabContainer}>
        {children}
      </Typography>
    );
  }

  // Метод, обрабатывающий смену активного пункта меню
  private handleChange = (event: ChangeEvent<{}>, value: number): ComponentState => {
    this.setState({ value });
  }

  // Метод аналогичный handleChange, но для анимации перехода
  private handleChangeIndex = (value: number): ComponentState => {
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
          axis={theme.direction === 'rtl' ?
            'x-reverse' :
            'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <this.TabContainer dir={theme.direction}>
            <EmployeeTable/>
          </this.TabContainer>
          <this.TabContainer dir={theme.direction}>
            <EmployeeTable/>
          </this.TabContainer>
        </SwipeableViews>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
