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
import { Context } from 'context';
import { IContext } from 'context/types';
import api from 'lib/api';
import Snackbar from 'lib/generic/Snackbar';
import { USERS_APP } from 'lib/session';
import { ISnackbarProps } from 'lib/types';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from './styles';
import './styles.css';
import { IAccount, IErrors, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент станицы регистрации
 * @param history история в браузере
 * @constructor
 */
const SignUpPage: FC<IProps> = ({ history }): JSX.Element => {
  const classes = useStyles();

  const context = useContext<IContext>(Context);

  // Набор переменных состояния для пользовательских данных
  const [account, setAccount] = useState<IAccount>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  // Переменная состояния для загрузки
  const [loading, setLoading] = useState<boolean>(false);

  // Набор переменных состояния для снэкбара
  const [snackbar, setSnackbar] = useState<ISnackbarProps>({
    open: false,
    message: '',
    variant: 'info',
  });

  // Набор переменных состояния для ошибок
  const [errors, setErrors] = useState<IErrors>({
    email: false,
    last_name: false,
    first_name: false,
    password: false,
  });

  /**
   * Функция обработки изменений в текстовом поле
   * @param event событие изменения
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setAccount({ ...account, [name]: value });
  };

  /**
   * Функция, закрывающая снэкбар
   */
  const closeSnackbar = (): void => setSnackbar({ ...snackbar, open: false });

  /**
   * Функция для сброса ошибок в полях
   */
  const resetErrors = (): void => (
    setErrors({ email: false, first_name: false, last_name: false, password: false })
  );

  /**
   * Функция отправки формы
   */
  const handleSubmit = (): void => {
    setLoading(true);
    const { email, first_name, last_name, password } = account;
    const sendData: IAccount = { email, password, first_name, last_name };
    api.sendContent('user/registrate', sendData, USERS_APP)
      .then((response: AxiosResponse): void => {
        const { message } = response.data;
        setSnackbar({ ...snackbar, message, open: true, variant: 'success' });
        setLoading(false);
        // Через 2 секунды перенаправляем на страницу входа
        setTimeout(() => history.push({ pathname: '/sign-in' }), 2000);
      })
      .catch((error: AxiosError): void => {
        if (error.response) {
          const { message, errors: errorsList } = error.response.data;
          setErrors({ ...errors, ...errorsList });
          setLoading(false);
          setSnackbar({ ...snackbar, message, open: true, variant: 'error' });
          // Через 3 секунды гасим ошибки
          setTimeout(resetErrors, 3000);
        }
      });
  };

  const { documentTitle } = context;

  useEffect(
    (): void => {
      document.title = `${documentTitle} | Зарегистрироваться в системе`;
    },
    [documentTitle],
  );

  return (
    <ReactCSSTransitionGroup
      transitionName="sign-up"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Snackbar onClose={closeSnackbar} {...snackbar} />
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
                  error={errors.first_name}
                  label="Имя"
                  value={account.first_name}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Фамилия"
                  error={errors.last_name}
                  name="last_name"
                  value={account.last_name}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Электронная почта"
                  error={errors.email}
                  name="email"
                  autoComplete="email"
                  value={account.email}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={errors.password}
                  name="password"
                  label="Пароль"
                  type="password"
                  autoComplete="current-password"
                  value={account.password}
                  onChange={handleTextChange}
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
