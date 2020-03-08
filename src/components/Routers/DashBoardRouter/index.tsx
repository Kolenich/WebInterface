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
    <Redirect exact from="/" to="/my-tasks/in-process"/>
    <Route inner path="/my-tasks/:filter(completed|in-process)" component={TasksTable}/>
    <Route inner path="/assign" component={TaskAssignment}/>
    <Route inner path="/my-tasks/:id" component={TaskDetail}/>
  </Switch>
);

export default DashBoardRouter;
