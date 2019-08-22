import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../lib/api';
import Snackbar from '../../lib/generic/Snackbar';
import { AUTH_API } from '../../lib/session';
import { styles } from './styles';
import './styles.css';
import { IProps, ISnackbarVariant } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент станицы регистрации
 */
const SignUpPage: FunctionComponent<IProps> = (): JSX.Element => {
  const classes = useStyles();

  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, openSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarVariant, setSnackbarVariant] = useState<ISnackbarVariant>('info');

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => (
    setFirstName(event.target.value)
  );
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => (
    setLastName(event.target.value)
  );
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => (
    setEmail(event.target.value)
  );
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => (
    setPassword(event.target.value)
  );
  const handleSubmit = (): void => {
    setLoading(true);
    const sendData = { email, first_name, last_name, password };
    api.sendContent(
      'user/registrate', sendData, AUTH_API)
      .then((response: AxiosResponse) => {
        openSnackbar(true);
        setSnackbarVariant('success');
        setSnackbarMessage(response.data.message);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          openSnackbar(true);
          setSnackbarVariant('error');
          setSnackbarMessage(error.response.data.message);
          setLoading(false);
        }
      });
  };
  const closeSnackbar = (): void => (
    openSnackbar(false)
  );

  return (
    <ReactCSSTransitionGroup
      transitionName="sign-up"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={closeSnackbar}
        variant={snackbarVariant}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="div" className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Зарегистрироваться
          </Typography>
          <Typography component="form" className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  label="Имя"
                  value={first_name}
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last_Name"
                  label="Фамилия"
                  name="last_Name"
                  value={last_name}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Электронная почта"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
              onClick={handleSubmit}
            >
              Зарегистрироваться
              {loading &&
              <CircularProgress size={15} className={classes.circularProgress} />}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/sign-in">
                  Уже есть учётная запись? Войдите с её помощью
                </Link>
              </Grid>
            </Grid>
          </Typography>
        </Typography>
      </Container>
    </ReactCSSTransitionGroup>
  );
};

export default SignUpPage;
