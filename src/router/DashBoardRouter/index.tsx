import TaskAssignment from 'components/TaskAssignment';
import TasksTable from 'components/TasksTable';
import React, { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import PrivateRoute from '../PrivateRouter';

/**
 * Роутер панели
 */
const DashBoardRouter: FunctionComponent<{}> = (): JSX.Element => (
  <Switch>
    <Redirect exact from="/main" to="/main/tasks" />
    <PrivateRoute path="/main/tasks" component={TasksTable} />
    <PrivateRoute path="/main/assign" component={TaskAssignment} />
  </Switch>
);

export default DashBoardRouter;
