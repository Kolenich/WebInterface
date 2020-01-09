import TaskAssignment from 'components/TaskAssignment';
import TaskDetail from 'components/TaskDetail';
import TasksTable from 'components/TasksTable';
import React, { FC, memo } from 'react';
import { Redirect, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Route from 'router/Route';

/**
 * Роутер панели
 * @returns {JSX.Element}
 * @constructor
 */
const DashBoardRouter: FC = () => (
  <Switch>
    <HashRouter hashType="slash">
      <Redirect exact from="/" to="/my-tasks/in-process"/>
      <Route inner path="/my-tasks/:filter(completed|in-process)" component={TasksTable}/>
      <Route inner path="/assign" component={TaskAssignment}/>
      <Route inner path="/my-tasks/:id" component={TaskDetail}/>
    </HashRouter>
  </Switch>
);

export default memo(DashBoardRouter);
