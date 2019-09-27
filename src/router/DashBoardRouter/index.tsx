import TaskAssignment from 'components/TaskAssignment';
import TaskDetail from 'components/TaskDetail';
import TasksTable from 'components/TasksTable';
import React, { FC } from 'react';
import { Redirect, Switch } from 'react-router';
import PrivateRoute from 'router/PrivateRouter';

/**
 * Роутер панели
 * @constructor
 */
const DashBoardRouter: FC<{}> = (): JSX.Element => (
  <Switch>
      <Redirect exact from="/main" to="/main/my-tasks" />
      <Redirect exact from="/main/my-tasks" to="/main/my-tasks/in-process" />
      <PrivateRoute path="/main/my-tasks/:filter(completed|in-process)" component={TasksTable} />
    <PrivateRoute path="/main/assign" component={TaskAssignment} />
      <PrivateRoute path="/main/my-tasks/:id" component={TaskDetail} />
  </Switch>
);

export default DashBoardRouter;
