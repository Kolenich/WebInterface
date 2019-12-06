import { Table } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/styles';
import React, { FC, memo } from 'react';
import { useHistory } from 'react-router';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кастомный компонент строки в таблице
 * @param {IProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const RowComponent: FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const history = useHistory();

  /**
   * Функция, перенаправляющая на страницу деталей задания
   */
  const handleClick = () => history.push({ pathname: `/my-tasks/${props.row.id}` });

  return (
    <Table.Row {...props} onDoubleClick={handleClick} className={classes.row} />
  );
};

export default memo(RowComponent);
