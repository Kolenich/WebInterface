import DashBoard from 'components/DashBoard';
import SignInPage from 'components/SignInPage';
import SignUpPage from 'components/SignUpPage';
import React, { FC, memo } from 'react';
import { Switch } from 'react-router';
import Route from './Route';

/**
 * Основной роутер приложения
 * @returns {JSX.Element}
 * @constructor
 */
const Router: FC = () => (
  <Switch>
      <Route path="/sign-up" component={SignUpPage}/>
      <Route path="/sign-in" component={SignInPage}/>
      <Route inner path="/" component={DashBoard}/>
  </Switch>
);

export default memo(Router);
