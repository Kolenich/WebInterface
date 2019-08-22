import EmployeeChart from 'components/EmployeeChart';
import EmployeeTable from 'components/EmployeeTable';
import SignInPage from 'components/SignInPage';
import SignUpPage from 'components/SignUpPage';
import withContext from 'lib/context';
import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';
import { IProps, IPropsContext } from './types';

/**
 * Основной роутер приложения
 */
const Router: FunctionComponent<IPropsContext> = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/employees" />} />
      <PublicRoute path="/sign-up" component={SignUpPage} />
      <PublicRoute path="/sign-in" component={SignInPage} />
      <PrivateRoute path="/employees" component={EmployeeTable} />
      <PrivateRoute path="/charts" component={EmployeeChart} />
    </Switch>
  );
};

export default withContext<IProps>(Router);
