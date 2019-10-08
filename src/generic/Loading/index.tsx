import { CircularProgress, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import './styles.css';

const Loading: FC<{}> = (): JSX.Element => (
  <Typography component="div" className="loading-shading">
    <CircularProgress className="loading-icon" />
  </Typography>
);

export default Loading;
