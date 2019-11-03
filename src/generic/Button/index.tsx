import { Button as ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { createElement, FC, memo } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кастомная кнопка
 * @param {((props: SvgIconProps) => JSX.Element) | undefined} icon компонент иконки на кнопке
 * @param {React.ReactNode} children жочерний элемент
 * @param {"left" | "right"} iconPlacement указатель на расположение иконки
 * @param {Partial<IProps>} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const Button: FC<IProps> = ({ icon, children, iconPlacement, ...props }: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <ButtonBase
      {...props}
    >
      {iconPlacement === 'left' && icon &&
      createElement(icon, { className: classes.leftIcon })}
      {children}
      {iconPlacement === 'right' && icon &&
      createElement(icon, { className: classes.rightIcon })}
    </ButtonBase>
  );
};

Button.defaultProps = {
  iconPlacement: 'right',
};

export default memo<IProps>(Button);
