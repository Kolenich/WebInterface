import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withDialog } from 'components';
import api from 'lib/api';
import React, { FC, useEffect, useState } from 'react';
import styles from './styles';
import { IProps, IUser } from './types';

const useStyles = makeStyles(styles);

const AccountDetail: FC<IProps> = ({ showError, history }) => {
  const classes = useStyles();

  useEffect(
    () => {
      api.getContent<IUser>('users/current-user/')
        .then((response) => setUser(response.data))
        .catch((error) => {
          showError(error);
          history.push({ pathname: '/sign-in' });
        });
    },
    [showError, history],
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

export default withDialog(AccountDetail);
