import { CircularProgress, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import './styles.css';

/**
 * Компонент, отображающий загрузку
 * @returns {JSX.Element}
 * @constructor
 */
const Loading: FC = () => (
  <Typography component="div" className="loading-shading">
    <CircularProgress className="loading-icon" />
  </Typography>
);

export default memo(Loading);
