import EmployeeChart from 'components/EmployeeChart';
import EmployeeTable from 'components/EmployeeTable';
import React, { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import PrivateRoute from '../PrivateRouter';
import { IProps } from '../types';

/**
 * Роутер панели
 */
const DashBoardRouter: FunctionComponent<IProps> = (): JSX.Element => (
  <Switch>
    <Redirect exact from="/main" to="/main/employees" />
    <PrivateRoute path="/main/employees" component={EmployeeTable} />
    <PrivateRoute path="/main/charts" component={EmployeeChart} />
  </Switch>
);

export default DashBoardRouter;
