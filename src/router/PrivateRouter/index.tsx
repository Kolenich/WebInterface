import auth from 'lib/auth';
import React, { Attributes, createElement } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { ICustomRoutingProps } from '../types';

/**
 * Роутер для авторизованных пользователей
 * @param component компонент для редиректа
 * @param rest остальные пропсы
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component, ...rest }: ICustomRoutingProps): JSX.Element => (
  <Route
    {...rest}
    render={(props: (RouteComponentProps & Attributes)): JSX.Element => (
      auth.checkToken()
        ? (createElement(component, props))
        : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
    )
    }
  />
);

export default PrivateRoute;
