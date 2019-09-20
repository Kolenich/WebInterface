import SignInPage from 'components/SignInPage';
import SignUpPage from 'components/SignUpPage';
import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import DashBoard from '../components/DashBoard';
import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';

/**
 * Основной роутер приложения
 */
const Router: FunctionComponent<{}> = (): JSX.Element => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/main" />} />
    <PublicRoute path="/sign-up" component={SignUpPage} />
    <PublicRoute path="/sign-in" component={SignInPage} />
    <PrivateRoute path="/main" component={DashBoard} />
  </Switch>
);

export default Router;
