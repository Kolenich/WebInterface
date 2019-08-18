import { CircularProgress, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import './styles.css';

const Loading: FunctionComponent<{}> = (): JSX.Element => (
  <Typography component="div" className="loading-shading">
    <CircularProgress className="loading-icon" />
  </Typography>
);

export default Loading;
