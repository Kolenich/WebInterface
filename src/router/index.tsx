import DashBoard from 'components/DashBoard';
import SignInPage from 'components/SignInPage';
import SignUpPage from 'components/SignUpPage';
import React, { FC } from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';

/**
 * Основной роутер приложения
 * @constructor
 */
const Router: FC<{}> = (): JSX.Element => (
  <Switch>
    <PublicRoute path="/sign-up" component={SignUpPage} />
    <PublicRoute path="/sign-in" component={SignInPage} />
    <PrivateRoute path="/" component={DashBoard} />
  </Switch>
);

export default Router;
