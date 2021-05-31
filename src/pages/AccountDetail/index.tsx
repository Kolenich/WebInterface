import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import api from 'lib/api';
import { getErrorMessage } from 'lib/utils';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect, useState } from 'react';
import styles from './styles';
import { IProps, IUser } from './types';

const useStyles = makeStyles(styles);

const AccountDetail: FC<IProps> = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getContent<IUser>('users/current-user/');
        setUser(data);
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
        history.push({ pathname: '/sign-in' });
      }
    })();
  }, [enqueueSnackbar, history]);

  return (
    <AppBar color="primary" classes={classes}>
      <Toolbar>
        Здарова
      </Toolbar>
    </AppBar>
  );
};

export default AccountDetail;
