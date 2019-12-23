import auth from 'lib/auth';
import React, { Attributes, createElement, FC, memo } from 'react';
import { Redirect, Route as RouteBase, RouteComponentProps } from 'react-router-dom';
import { IProps } from 'router/types';

/**
 * Роутер для неавторизованных пользователей
 * @param {React.ComponentClass<any> | React.FunctionComponent<any>} component компонент для
 * редиректа
 * @param {boolean} inner пометка, что страница только для авторизованных пользователей
 * @param {IProps} rest остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const Route: FC<IProps> = ({ component, inner, ...rest }: IProps) => {
  const publicRouter = (props: (RouteComponentProps & Attributes)) => (
    auth.checkToken()
      ? (<Redirect to={{ pathname: '/' }}/>)
      : (createElement(component, props))
  );

  const privateRouter = (props: (RouteComponentProps & Attributes)) => (
    auth.checkToken()
      ? (createElement(component, props))
      : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }}/>
  );

  return (
    <RouteBase
      {...rest}
      render={inner ? privateRouter : publicRouter}
    />
  );
};

export default memo(Route);
