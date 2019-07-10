import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { PureComponent, ReactNode } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from './styles';
import './styles.css';
import { IProps, IState } from './types';

/**
 * Компонент станицы регистрации
 */
class SignUpPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  /**
   * Метод, вызываемый в момент монтирования компонента
   */
  componentDidMount(): void {
    document.title = 'Зарегистрироваться в системе';
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="sign-up"
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
              Зарегистрироваться
            </Typography>
            <Typography component="form" className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="Имя"
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
                    autoComplete="lname"
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
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Зарегистрироваться
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
