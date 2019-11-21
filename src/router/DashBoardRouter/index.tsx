import TaskAssignment from 'components/TaskAssignment';
import TaskDetail from 'components/TaskDetail';
import TasksTable from 'components/TasksTable';
import React, { FC, memo } from 'react';
import { Redirect, Switch } from 'react-router';
import PrivateRoute from 'router/PrivateRouter';

/**
 * Роутер панели
 * @returns {JSX.Element}
 * @constructor
 */
const DashBoardRouter: FC<{}> = () => (
  <Switch>
    <Redirect exact from="/" to="/my-tasks/in-process" />
    <PrivateRoute path="/my-tasks/:filter(completed|in-process)" component={TasksTable} />
    <PrivateRoute path="/assign" component={TaskAssignment} />
    <PrivateRoute path="/my-tasks/:id" component={TaskDetail} />
  </Switch>
);

export default memo<{}>(DashBoardRouter);
