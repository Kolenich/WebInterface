import { withStyles } from '@material-ui/core';
import React, { PureComponent, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import EmployeeChart from '../EmployeeChart';
import EmployeeTable from '../EmployeeTable';
import LogInPage from '../LogInPage';
import { styles } from './styles';
import { IProps, IState } from './types';

/**
 * Компонент основной страницы
 */
class MainPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    return (
      <Switch>
        <Route path="/login" component={LogInPage}/>
        <Route path="/employees" component={EmployeeTable}/>
        <Route path="/charts" component={EmployeeChart}/>
        <Redirect to="/login" from="/"/>
      </Switch>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
