import { withStyles } from '@material-ui/core';
import React, { PureComponent, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import EmployeeChart from '../EmployeeChart';
import EmployeeTable from '../EmployeeTable';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
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
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/employees" component={EmployeeTable}/>
        <Route path="/charts" component={EmployeeChart}/>
        <Redirect to="/sign-in" from="/" />
      </Switch>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
