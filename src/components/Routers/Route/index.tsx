import { IProps } from 'components/Routers/types';
import auth from 'lib/auth';
import React, { Attributes, createElement, FC } from 'react';
import { Redirect, Route as RouteBase, RouteComponentProps } from 'react-router-dom';

/**
 * Кастомный роутер
 * @param {React.ComponentType} component компонент для редиректа
 * @param {boolean} authorized пометка, что страница только для авторизованных пользователей
 * @param {IProps} rest остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const Route: FC<IProps> = ({ component, authorized, ...rest }: IProps) => {
  /**
   * Роутер для неавторизованных пользователей
   * @param {RouteComponentProps & React.Attributes} props передаваемые пропсы
   * @returns {JSX.Element}
   */
  const publicRouter = (props: (RouteComponentProps & Attributes)) => (
    auth.checkToken()
      ? <Redirect to={{ pathname: '/' }}/>
      : (createElement(component, props))
  );

  /**
   * Роутер для авторизованных пользователей
   * @param {RouteComponentProps & React.Attributes} props передаваемые пропсы
   * @returns {JSX.Element}
   */
  const privateRouter = (props: (RouteComponentProps & Attributes)) => (
    auth.checkToken()
      ? (createElement(component, props))
      : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }}/>
  );

  return (
    <RouteBase
      {...rest}
    >
      {authorized ? privateRouter : publicRouter}
    </RouteBase>
  );
};

export default Route;
