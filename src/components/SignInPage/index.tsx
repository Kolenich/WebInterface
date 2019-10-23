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
import { AxiosError } from 'axios';
import { Context } from 'context';
import { IContext } from 'context/types';
import auth from 'lib/auth';
import { useSnackbar } from 'notistack';
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import { ILogin, IProps, IStatus } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонента страницы входа в систему
 * @param {History<LocationState>} history история в браузере
 * @returns {JSX.Element}
 * @constructor
 */
const SignInPage: FC<IProps> = ({ history }: IProps): JSX.Element => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

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

  // Переменная состояния загрузки страницы
  const [mounted, setMounted] = useState<boolean>(false);

  const { email, password } = login;

  const { error, loading, remember } = status;

  const { documentTitle } = context.getters;

  useEffect(
    (): void => {
      document.title = `${documentTitle} | Войти в систему`;
    },
    [documentTitle],
  );

  /**
   * Функция обработки изменений персональных данных
   * @param {React.ChangeEvent<HTMLInputElement>} event объект события изменения
   */
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  /**
   * Функция обработки изменения чекбокса
   * @param {React.ChangeEvent<HTMLInputElement>} event объект события изменения
   */
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setStatus({ ...status, [name]: checked });
  };

  /**
   * Функция обработки нажатия на Enter
   * @param {React.KeyboardEvent<HTMLDivElement>} event объект события изменения
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
          setTimeout((): void => setStatus({ ...status, error: false }), 3000);
        }
        enqueueSnackbar(message, { variant: 'error' });
      });
  };

  useEffect((): void => setMounted(true), []);

  return (
    <Zoom in={mounted} timeout={750}>
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
    </Zoom>
  );
};

export default memo<IProps>(SignInPage);
