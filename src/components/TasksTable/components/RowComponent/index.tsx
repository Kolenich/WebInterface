import { Table } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useHistory } from 'react-router';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кастомный компонент строки в таблице
 * @param props остальные пропсы
 * @constructor
 */
const RowComponent: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  const history = useHistory();

  /**
   * Функция, перенаправляющая на страницу деталей задания
   */
  const handleClick = (): void => history.push({ pathname: `/my-tasks/${props.row.id}` });

  return (
    <Table.Row {...props} onClick={handleClick} className={classes.row} />
  );
};

export default RowComponent;
