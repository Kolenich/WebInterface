import EmployeeChart from 'components/EmployeeChart';
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
    <PrivateRoute path="/main/charts" component={EmployeeChart} />
  </Switch>
);

export default DashBoardRouter;
