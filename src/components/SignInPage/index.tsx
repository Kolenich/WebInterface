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
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { AxiosError } from 'axios';
import { Context } from 'context';
import { IContext } from 'context/types';
import auth from 'lib/auth';
import React, { ChangeEvent, FC, KeyboardEvent, useContext, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import './styles.css';
import { ILogin, IProps, IStatus } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонента страницы входа в систему
 * @param history история в браузере
 * @constructor
 */
const SignInPage: FC<IProps> = ({ history }: IProps): JSX.Element => {
  const classes = useStyles();

  const context = useContext<IContext>(Context);

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

  const { email, password } = login;

  const { error, loading, remember } = status;

  const { openSnackbar } = context.setters;
  const { documentTitle } = context.getters;

  useEffect(
    (): void => {
      document.title = `${documentTitle} | Войти в систему`;
    },
    [documentTitle],
  );

  /**
   * Функция обработки изменений персональных данных
   * @param event объект события изменения
   */
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  /**
   * Функция обработки изменения свича
   * @param event объект события изменения
   */
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setStatus({ ...status, [name]: checked });
  };

  /**
   * Функция обработки нажатия на Enter
   * @param event объект события изменения
   */
  const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  /**
   * Функция логина
   */
  const handleLogin = (): void => {
    setStatus({ ...status, loading: true });
    auth.login(email, password, remember)
      .then((): void => {
        setStatus({ ...status, loading: false });
        history.push({ pathname: '/' });
      })
      .catch((error: AxiosError): void => {
        setStatus({ ...status, loading: false });
        let message: string = 'Сервер недоступен, попробуйте позже';
        if (error.response) {
          auth.delToken();
          auth.delHeader();
          message = 'Неверные логин или пароль';
          setStatus({ ...status, error: true });
          // Убираем ошибку через 3 секунды
          setTimeout(() => setStatus({ ...status, error: false }), 3000);
        }
        openSnackbar!('error', message);
      });
  };

  return (
    <ReactCSSTransitionGroup
      transitionName="sign-in"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Typography component="div" className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
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
              error={error}
              autoComplete="email"
              value={email}
              onChange={handleLoginChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={error}
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleLoginChange}
              onKeyPress={handleEnterPress}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={remember}
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
              disabled={loading}
            >
              Войти
              {loading &&
              <CircularProgress size={15} className={classes.circularProgress} />}
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
    </ReactCSSTransitionGroup>
  );
};

export default SignInPage;
