import auth from 'lib/auth';
import React, { Attributes, createElement, FC, memo } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { IProps } from 'router/types';

/**
 * Роутер для авторизованных пользователей
 * @param {React.ComponentClass<any> | React.FunctionComponent<any>} component компонент для
 * редиректа
 * @param {IProps} rest остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const PrivateRoute: FC<IProps> = ({ component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props: (RouteComponentProps & Attributes)) => (
      auth.checkToken()
        ? (createElement(component, props))
        : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
    )
    }
  />
);

export default memo<IProps>(PrivateRoute);
