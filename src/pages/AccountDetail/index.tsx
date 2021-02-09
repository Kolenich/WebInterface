import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import api from 'lib/api';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect, useState } from 'react';
import { getErrorMessage } from '../../lib/utils';
import styles from './styles';
import { IProps, IUser } from './types';

const useStyles = makeStyles(styles);

const AccountDetail: FC<IProps> = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(
    () => {
      api.getContent<IUser>('users/current-user/')
        .then((response) => setUser(response.data))
        .catch((error) => {
          enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
          history.push({ pathname: '/sign-in' });
        });
    },
    [enqueueSnackbar, history],
  );

  const [, setUser] = useState({});

  return (
    <AppBar color="primary" classes={classes}>
      <Toolbar>
        Здарова
      </Toolbar>
    </AppBar>
  );
};

export default AccountDetail;
