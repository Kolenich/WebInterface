import EmployeeChart from 'components/EmployeeChart';
import EmployeeTable from 'components/EmployeeTable';
import withContext from 'lib/context';
import React, { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import PrivateRoute from '../PrivateRouter';
import { IProps, IPropsContext } from '../types';

/**
 * Роутер панели
 */
const DashBoardRouter: FunctionComponent<IPropsContext> = (): JSX.Element => (
  <Switch>
    <Redirect exact from="/main" to="/main/employees" />
    <PrivateRoute path="/main/employees" component={EmployeeTable} />
    <PrivateRoute path="/main/charts" component={EmployeeChart} />
  </Switch>
);

export default withContext<IProps>(DashBoardRouter);
