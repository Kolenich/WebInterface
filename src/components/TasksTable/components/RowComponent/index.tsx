import { Table } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кастомный компонент строки в таблице
 * @param history история в браузере
 * @param props остальные пропсы
 * @constructor
 */
const RowComponent: FC<IProps> = ({ history, ...props }: IProps): JSX.Element => {
  const classes = useStyles();

  // Обработка ошибки на переменную staticContext
  const row = { ...props };
  delete row.staticContext;

  /**
   * Функция, перенаправляющая на страницу деталей задания
   */
  const handleClick = (): void => {
    const { id } = props.row;
    history.push({ pathname: `/my-tasks/${id}` });
  };

  return (
    <Table.Row {...row} onClick={handleClick} className={classes.row} />
  );
};

export default withRouter(RowComponent);
