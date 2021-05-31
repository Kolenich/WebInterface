import { AccountDetail, DashBoard, SignIn, SignUp } from 'pages';
import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

/**
 * Основной роутер приложения
 * @returns {JSX.Element}
 * @constructor
 */
const Router: FC = () => (
  <Switch>
    <Route path="/sign-up" component={SignUp}/>
    <Route path="/sign-in" component={SignIn}/>
    <Route loginRequired path="/account" component={AccountDetail}/>
    <Route loginRequired path="/" component={DashBoard}/>
  </Switch>
);

export default Router;
