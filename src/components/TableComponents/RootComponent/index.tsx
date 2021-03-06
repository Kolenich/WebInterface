import { Grid } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Корневой компонент виртуальной таблицы
 * @param {IProps} props передаваемые пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const RootComponent: FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid.Root {...props} className={classes.root}/>
  );
};

export default RootComponent;
