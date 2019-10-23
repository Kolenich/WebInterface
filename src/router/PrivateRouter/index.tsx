import auth from 'lib/auth';
import React, { Attributes, createElement, FC, memo } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { IProps } from 'router/types';

/**
 * Роутер для авторизованных пользователей
 * @param component компонент для редиректа
 * @param rest остальные пропсы
 * @returns {*}
 * @constructor
 */
const PrivateRoute: FC<IProps> = ({ component, ...rest }: IProps): JSX.Element => (
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

export default memo<IProps>(PrivateRoute);
