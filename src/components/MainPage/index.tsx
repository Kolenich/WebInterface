import withContext from 'lib/context';
import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import EmployeeChart from '../EmployeeChart';
import EmployeeTable from '../EmployeeTable';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import { IProps, IPropsContext } from './types';

/**
 * Компонент основной страницы
 */
const MainPage: FunctionComponent<IPropsContext> = ({ context }: IPropsContext): JSX.Element => {
  const { loggedIn } = context.state;
  return (
    <Switch>
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/employees" component={EmployeeTable} />
      <Route path="/charts" component={EmployeeChart} />
      {loggedIn &&
      <Redirect to="/employees" from="/" />}
      {!loggedIn &&
      <Redirect to="/sign-in" from="/" />}
    </Switch>
  );
};

export default withContext<IProps>(MainPage);
