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
import api from 'lib/api';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getErrorMessage } from '../../lib/utils';
import styles from './styles';
import { IAccount, IErrors, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент станицы регистрации
 * @param {History<LocationState>} history история в браузере
 * @returns {JSX.Element}
 * @constructor
 */
const SignUpPage: FC<IProps> = ({ history }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { getters: { documentTitle } } = useContext<IGlobalState>(Context);

  // Набор переменных состояния для пользовательских данных
  const [account, setAccount] = useState<IAccount>({
    first_name: '',
    last_name: '',
    middle_name: '',
    username: '',
    email: '',
    password: '',
    mailing: false,
  });

  // Переменная состояния для загрузки
  const [loading, setLoading] = useState<boolean>(false);

  // Набор переменных состояния для ошибок
  const [errors, setErrors] = useState<IErrors>({
    email: false,
    last_name: false,
    first_name: false,
    username: false,
    password: false,
  });

  /**
   * Функция для сброса ошибок в полях
   */
  const resetErrors = () => (
    setErrors({ email: false, first_name: false, last_name: false, password: false })
  );

  /**
   * Функция отправки формы
   */
  const handleSubmit = async () => {
    setLoading(true);
    const sendData = { ...account };
    if (!account.middle_name) {
      delete account.middle_name;
    }
    try {
      const response = await api.sendContent('users/registrate/', sendData);
      const { detail } = response.data;
      enqueueSnackbar(detail, { variant: 'success' });
      // Через 2 секунды перенаправляем на страницу входа
      setTimeout(() => history.push({ pathname: '/sign-in' }), 2000);
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
      if (error.response) {
        const { errors: errorsList } = error.response.data;
        setErrors((oldErrors) => ({ ...oldErrors, ...errorsList }));
      }
      // Через 3 секунды гасим ошибки
      setTimeout(resetErrors, 3000);
      setLoading(false);
    }
  };

  useEffect(
    () => {
      document.title = `${documentTitle} | Зарегистрироваться в системе`;
    },
    [documentTitle],
  );

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline/>
      <Typography component="div" className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        <Typography component="form" className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Имя пользователя"
                error={errors.username}
                name="username"
                autoComplete="username"
                value={account.username}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount((oldAccount) => ({
                  ...oldAccount,
                  [event.target.name]: event.target.value,
                }))}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount((oldAccount) => ({
                  ...oldAccount,
                  [event.target.name]: event.target.value,
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="first_name"
                variant="outlined"
                required
                fullWidth
                error={errors.first_name}
                label="Имя"
                value={account.first_name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount((oldAccount) => ({
                  ...oldAccount,
                  [event.target.name]: event.target.value,
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Фамилия"
                error={errors.last_name}
                name="last_name"
                value={account.last_name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount((oldAccount) => ({
                  ...oldAccount,
                  [event.target.name]: event.target.value,
                }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                label="Отчество"
                name="middle_name"
                value={account.middle_name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount((oldAccount) => ({
                  ...oldAccount,
                  [event.target.name]: event.target.value,
                }))}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount((oldAccount) => ({
                  ...oldAccount,
                  [event.target.name]: event.target.value,
                }))}
              />
            </Grid>
            <Grid item xs="auto">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={account.mailing}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => (
                      setAccount((oldAccount) => ({
                        ...oldAccount,
                        [event.target.name]: event.target.checked,
                      }))
                    )}
                    name="mailing"
                    color="primary"
                  />
                }
                label="Получать оповещения на почту"
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
            {loading && (
              <CircularProgress size={15} className={classes.circularProgress}/>
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} component={RouterLink} to="/sign-in">
                Уже есть учётная запись? Войдите с её помощью
              </Link>
            </Grid>
          </Grid>
        </Typography>
      </Typography>
    </Container>
  );
};

export default SignUpPage;
