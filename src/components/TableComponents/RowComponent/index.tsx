import { Table } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кастомный компонент строки в таблице
 * @param {React.ReactNode} children дочерние элементы
 * @param {IProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const RowComponent: FC<IProps> = ({ children, ...props }) => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Table.Row
      {...props}
      onDoubleClick={() => history.push({ pathname: `/tasks/${props.row.id}` })}
      className={classes.row}
    >
      {children}
    </Table.Row>
  );
};

export default RowComponent;
