import Route from 'components/Routers/Route';
import { TaskAssignment, TaskDetail, TasksTable } from 'pages';
import React, { FC } from 'react';
import { Redirect, Switch } from 'react-router';

/**
 * Роутер панели
 * @returns {JSX.Element}
 * @constructor
 */
const DashBoardRouter: FC = () => (
  <Switch>
    <Redirect exact from="/" to="/tasks/in-process"/>
    <Route loginRequired path="/tasks/:filter(completed|in-process|archived)" component={TasksTable}/>
    <Route loginRequired path="/assign" component={TaskAssignment}/>
    <Route loginRequired path="/tasks/:id" component={TaskDetail}/>
  </Switch>
);

export default DashBoardRouter;
