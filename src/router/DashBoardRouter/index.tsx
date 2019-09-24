import TaskAssignment from 'components/TaskAssignment';
import TaskDetail from 'components/TaskDetail';
import TasksTable from 'components/TasksTable';
import React, { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import PrivateRoute from 'router/PrivateRouter';

/**
 * Роутер панели
 * @constructor
 */
const DashBoardRouter: FunctionComponent<{}> = (): JSX.Element => (
  <Switch>
    <Redirect exact from="/main" to="/main/tasks" />
    <Redirect exact from="/main/tasks" to="/main/tasks/in-process" />
    <PrivateRoute path="/main/tasks/:filter(completed|in-process)" component={TasksTable} />
    <PrivateRoute path="/main/assign" component={TaskAssignment} />
    <PrivateRoute path="/main/task/:id" component={TaskDetail} />
  </Switch>
);

export default DashBoardRouter;
