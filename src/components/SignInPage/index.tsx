import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { LockOutlined } from '@material-ui/icons';
import { AxiosError, AxiosResponse } from 'axios';
import React, { ChangeEvent, Component, ComponentState, ReactNode } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import { session } from '../../lib/session';
import { styles } from './styles';
import './styles.css';
import { IProps, IState } from './types';

/**
 * Компонента страницы входа в систему
 */
class SignInPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  /**
   * Метод, вызываемый в момент монтирования компонента
   */
  componentDidMount(): void {
    document.title = 'Войти в систему';
  }

  /**
   * Метод, обрабатывающий изменение в текстовом поле
   * @param event объект сбытия изменения
   */
  handleTextChange = (event: ChangeEvent<HTMLInputElement>): ComponentState => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * Метод для обработки нажатия на кнопку "Войти"
   */
  handleLogin = (): ComponentState => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    session.post('auth/login/', { email, password })
      .then((response: AxiosResponse) => {
        this.setState({ loading: false });
        console.log(response);
      })
      .catch((error: AxiosError) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    const { email, password, loading } = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="sign-in"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Container component="main" maxWidth="xs">
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
                autoComplete="email"
                value={email}
                onChange={this.handleTextChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handleTextChange}
              />
              {/*<FormControlLabel*/}
              {/*  control={<Checkbox value="remember" color="primary" />}*/}
              {/*  label="Запомнить"*/}
              {/*/>*/}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleLogin}
                disabled={loading}
              >
                Войти
                {loading &&
                <CircularProgress size={15} className={classes.circularProgress} />}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2" component={RouterLink} to="/employees">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" component={RouterLink} to="/sign-up">
                    Нет учётной записи? Зарегистрируйтесь!
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

export default withStyles(styles)(SignInPage);
