import React, { PureComponent, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import withContext from '../../lib/context';
import EmployeeChart from '../EmployeeChart';
import EmployeeTable from '../EmployeeTable';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import { IProps, IPropsContext, IState } from './types';

/**
 * Компонент основной страницы
 */
class MainPage extends PureComponent<IPropsContext, IState> {
  constructor(props: IPropsContext) {
    super(props);
    this.state = {};
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { context } = this.props;
    const { loggedIn } = context.state;
    return (
      <Switch>
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/employees" component={EmployeeTable} />
        <Route path="/charts" component={EmployeeChart} />
        {loggedIn &&
        <Redirect to="/employees" from="/" />}
        {!loggedIn &&
        <Redirect to="/sign-in" from="/" />}
      </Switch>
    );
  }
}

export default withContext<IProps>(MainPage);
