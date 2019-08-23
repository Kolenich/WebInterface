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
import React, { ChangeEvent, PureComponent, ReactNode } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../lib/api';
import Snackbar from '../../lib/generic/Snackbar';
import { AUTH_API } from '../../lib/session';
import { styles } from './styles';
import './styles.css';
import { IProps, IState } from './types';

/**
 * Компонент станицы регистрации
 */
class SignUpPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      loading: false,
      snackbarOpen: false,
      snackbarMessage: '',
      snackbarVariant: 'info',
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
   * Функция отправки формы
   */
  private handleSubmit = (): void => {
    this.setState((state: IState) => ({ ...state, loading: true }));
    const { email, first_name, last_name, password } = this.state;
    const sendData = { email, first_name, last_name, password };
    api.sendContent(
      'user/registrate', sendData, AUTH_API)
      .then((response: AxiosResponse) => {
        this.setState((state: IState) => ({
          ...state,
          snackbarOpen: true,
          snackbarVariant: 'success',
          snackbarMessage: response.data.message,
          loading: false,
        }));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const { message } = error.response.data;
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
      loading,
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
