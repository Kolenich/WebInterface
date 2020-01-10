import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  Zoom,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Context } from 'context';
import { IContext } from 'context/types';
import { withDialog } from 'decorators';
import auth from 'lib/auth';
import { compose, useMountEffect } from 'lib/utils';
import React, { ChangeEvent, FC, KeyboardEvent, memo, useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import { ILogin, IProps, IStatus } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонента страницы входа в систему
 * @param {History<LocationState>} history история в браузере
 * @param {(error: AxiosError, by: ("dialog" | "snackbar")) => void} showError функция вывода ошибки
 * @returns {JSX.Element}
 * @constructor
 */
const SignInPage: FC<IProps> = ({ history, showError }: IProps) => {
  const classes = useStyles();

  const { getters: { documentTitle } } = useContext<IContext>(Context);

  // Набор переменных состояния для данных логина
  const [login, setLogin] = useState<ILogin>({
    email: '',
    password: '',
  });

  // Набор переменных состояния для статуса
  const [status, setStatus] = useState<IStatus>({
    error: false,
    loading: false,
    remember: false,
  });

  // Переменная состояния загрузки страницы
  const [mounted, setMounted] = useState<boolean>(false);

  useMountEffect(
    () => {
      document.title = `${documentTitle} | Войти в систему`;
    },
  );

  /**
   * Функция обработки изменений персональных данных
   * @param {React.ChangeEvent<HTMLInputElement>} event объект события изменения
   */
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin((oldLogin: ILogin) => ({ ...oldLogin, [name]: value }));
  };

  /**
   * Функция обработки изменения чекбокса
   * @param {React.ChangeEvent<HTMLInputElement>} event объект события изменения
   */
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setStatus((oldStatus: IStatus) => ({ ...oldStatus, [name]: checked }));
  };

  /**
   * Функция обработки нажатия на Enter
   * @param {React.KeyboardEvent<HTMLDivElement>} event объект события изменения
   */
  const handleEnterPress = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      await handleLogin();
    }
  };

  /**
   * Функция логина
   */
  const handleLogin = async () => {
    setStatus((oldStatus: IStatus) => ({ ...oldStatus, loading: true }));
    try {
      await auth.login(login.email, login.password, status.remember);
      history.push({ pathname: '/' });
    } catch (error) {
      auth.delToken();
      auth.delHeader();
      let forceMessage;
      if (error.response && error.response.status === 400) {
        forceMessage = 'Неверные логин или пароль';
      }
      showError(error, 'snackbar', forceMessage);
      setStatus((oldStatus: IStatus) => ({ ...oldStatus, loading: false }));
    }
  };

  useMountEffect(() => setMounted(() => true));

  return (
    <Zoom in={mounted} timeout={750}>
      <Container component="main" maxWidth="sm">
        <CssBaseline/>
        <Typography component="div" className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Typography component="form" className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              error={status.error}
              autoComplete="email"
              value={login.email}
              onChange={handleLoginChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={status.error}
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={login.password}
              onChange={handleLoginChange}
              onKeyPress={handleEnterPress}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={status.remember}
                  name="remember"
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label="Запомнить"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
              disabled={status.loading}
            >
              Войти
              {status.loading &&
              <CircularProgress size={15} className={classes.circularProgress}/>}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} component={RouterLink} to="/sign-up">
                  Нет учётной записи? Зарегистрируйтесь!
                </Link>
              </Grid>
            </Grid>
          </Typography>
        </Typography>
      </Container>
    </Zoom>
  );
};

export default compose<IProps>([memo, withDialog], SignInPage);
