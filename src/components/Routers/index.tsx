import { AccountDetail, DashBoard, SignIn, SignUp } from 'pages';
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
    <Route path="/sign-up" component={SignUp}/>
    <Route path="/sign-in" component={SignIn}/>
    <Route path="/account" component={AccountDetail}/>
    <Route authorized path="/" component={DashBoard}/>
  </Switch>
);

export default Router;
