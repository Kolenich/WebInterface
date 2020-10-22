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
    <Route authorized path="/tasks/:filter(completed|in-process)" component={TasksTable}/>
    <Route authorized path="/assign" component={TaskAssignment}/>
    <Route authorized path="/tasks/:id" component={TaskDetail}/>
  </Switch>
);

export default DashBoardRouter;
