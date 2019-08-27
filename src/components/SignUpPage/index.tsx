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
import { withStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import api from 'lib/api';
import Snackbar from 'lib/generic/Snackbar';
import { AUTH_API } from 'lib/session';
import React, { ChangeEvent, PureComponent, ReactNode } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from './styles';
import './styles.css';
import { IErrors, IProps, IState } from './types';

/**
 * Компонент станицы регистрации
 */
class SignUpPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    document.title = 'Зарегистрироваться в системе';
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      loading: false,
      snackbarOpen: false,
      snackbarMessage: '',
      snackbarVariant: 'info',
      errors: {
        email: false,
        last_name: false,
        first_name: false,
        password: false,
      },
    };
  }

  /**
   * Функция обработки изменений в текстовом поле
   * @param event событие изменения
   */
  private handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    this.setState((state: IState) => ({ ...state, [name]: value }));
  }

  /**
   * Функция, закрывающая снэкбар
   */
  private closeSnackbar = (): void => (
    this.setState((state: IState) => ({ ...state, snackbarOpen: false }))
  )

  /**
   * Функция для выстановки ошибок в полях
   * @param errorsList массив со списком полей
   */
  private setErrors = (errorsList: string[]): void => {
    const errors: IErrors = {};
    errorsList.map((field: string) => errors[field] = true);
    this.setState((state: IState) => ({
      ...state,
      errors: { ...state.errors, ...errors },
    }));
    // Через 3 секунды гасим ошибки
    setTimeout(
      (): void => {
        errorsList.map((field: string) => errors[field] = false);
        this.setState((state: IState) => ({
          ...state,
          errors: { ...state.errors, ...errors },
        }));
      },
      3000);
  }

  /**
   * Функция отправки формы
   */
  private handleSubmit = (): void => {
    const { history } = this.props;
    this.setState((state: IState) => ({ ...state, loading: true }));
    const { email, first_name, last_name, password } = this.state;
    const sendData = { email, first_name, last_name, password };
    api.sendContent('user/registrate', sendData, AUTH_API)
      .then((response: AxiosResponse): void => {
        this.setState((state: IState) => ({
          ...state,
          snackbarOpen: true,
          snackbarVariant: 'success',
          snackbarMessage: response.data.message,
          loading: false,
        }));
        // Через 2 секунды перенаправляем на страницу входа
        setTimeout(() => history.push({ pathname: '/sign-in' }), 2000);
      })
      .catch((error: AxiosError): void => {
        if (error.response) {
          const { message, errors } = error.response.data;
          this.setErrors(errors);
          this.setState((state: IState) => ({
            ...state,
            snackbarOpen: true,
            snackbarVariant: 'error',
            snackbarMessage: message,
            loading: false,
          }));
        }
      });
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    const {
      email, first_name, last_name, password, snackbarOpen, snackbarMessage, snackbarVariant,
      loading, errors,
    } = this.state;
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
          onClose={this.closeSnackbar}
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
                    error={errors.first_name}
                    label="Имя"
                    value={first_name}
                    onChange={this.handleTextChange}
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
                    value={last_name}
                    onChange={this.handleTextChange}
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
                    value={email}
                    onChange={this.handleTextChange}
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
                    value={password}
                    onChange={this.handleTextChange}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
                onClick={this.handleSubmit}
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
  }
}

export default withStyles(styles)(SignUpPage);
