import DashBoard from 'pages/DashBoard';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import React, { FC } from 'react';
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

export default Router;
