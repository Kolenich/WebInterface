import auth from 'lib/auth';
import React, { Attributes, createElement, FC, memo } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { IProps } from 'router/types';

/**
 * Роутер для неавторизованных пользователей
 * @param {React.ComponentClass<any> | React.FunctionComponent<any>} component компонент для
 * редиректа
 * @param {IProps} rest остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const PublicRoute: FC<IProps> = ({ component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props: (RouteComponentProps & Attributes)) => (
      auth.checkToken()
        ? (<Redirect to={{ pathname: '/' }} />)
        : (createElement(component, props))
    )
    }
  />
);

export default memo(PublicRoute);
