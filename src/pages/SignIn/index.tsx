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
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import auth from 'lib/auth';
import { getErrorMessage } from 'lib/utils';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FC, KeyboardEvent, useContext, useEffect, useState } from 'react';
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
const SignInPage: FC<IProps> = ({ history }) => {
  const classes = useStyles();

  const { getters: { documentTitle } } = useContext<IGlobalState>(Context);
  const { enqueueSnackbar } = useSnackbar();

  // Набор переменных состояния для данных логина
  const [login, setLogin] = useState<ILogin>({
    username: '',
    password: '',
  });

  // Набор переменных состояния для статуса
  const [status, setStatus] = useState<IStatus>({
    error: false,
    loading: false,
    remember: false,
  });

  useEffect(() => {
    document.title = `${documentTitle} | Войти в систему`;
  }, [documentTitle]);

  /**
   * Функция логина
   */
  const handleLogin = async () => {
    setStatus((oldStatus) => ({ ...oldStatus, loading: true }));
    try {
      await auth.login(login.username, login.password, status.remember);
      history.push({ pathname: '/' });
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
      setStatus((oldStatus) => ({ ...oldStatus, loading: false }));
    }
  };

  return (
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
            id="username"
            label="Имя пользователя"
            name="username"
            error={status.error}
            autoComplete="username"
            value={login.username}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setLogin((oldLogin) => ({
              ...oldLogin,
              [event.target.name]: event.target.value,
            }))}
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => setLogin((oldLogin) => ({
              ...oldLogin,
              [event.target.name]: event.target.value,
            }))}
            onKeyPress={async (event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === 'Enter') {
                await handleLogin();
              }
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={status.remember}
                name="remember"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStatus((oldStatus) => ({
                  ...oldStatus,
                  [event.target.name]: event.target.checked,
                }))}
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
            {status.loading
            && <CircularProgress size={15} className={classes.circularProgress}/>}
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
  );
};

export default SignInPage;
