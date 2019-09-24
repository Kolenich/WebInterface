import auth from 'lib/auth';
import React, { Attributes, createElement } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { ICustomRoutingProps } from 'router/types';

/**
 * Роутер для неавторизованных пользователей
 * @param component компонент для редиректа
 * @param rest остальные пропсы
 * @returns {*}
 * @constructor
 */
const PublicRoute = ({ component, ...rest }: ICustomRoutingProps): JSX.Element => (
  <Route
    {...rest}
    render={(props: (RouteComponentProps & Attributes)): JSX.Element => (
      auth.checkToken()
        ? (<Redirect to={{ pathname: '/' }} />)
        : (createElement(component, props))
    )
    }
  />
);

export default PublicRoute;
