import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент, отображающий загрузку
 * @returns {JSX.Element}
 * @constructor
 */
const Loading: FC = () => {
  const classes = useStyles();

  return (
    <Typography component="div" className={classes.loadingShading}>
      <CircularProgress className={classes.loadingIcon}/>
    </Typography>
  );
};

export default Loading;
