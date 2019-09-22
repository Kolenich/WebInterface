import TaskAssignment from 'components/TaskAssignment';
import TasksTable from 'components/TasksTable';
import React, { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import TaskDetail from '../../components/TaskDetail';
import PrivateRoute from '../PrivateRouter';

/**
 * Роутер панели
 */
const DashBoardRouter: FunctionComponent<{}> = (): JSX.Element => (
  <Switch>
    <Redirect exact from="/main" to="/main/tasks" />
    <PrivateRoute path="/main/tasks" component={TasksTable} />
    <PrivateRoute path="/main/assign" component={TaskAssignment} />
    <PrivateRoute path="/main/task/:id" component={TaskDetail} />
  </Switch>
);

export default DashBoardRouter;
