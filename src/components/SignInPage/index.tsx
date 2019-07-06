import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { LockOutlined } from '@material-ui/icons';
import React, { Component, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from './styles';
import { IProps, IState } from './types';

/**
 * Компонента страницы входа в систему
 */
class SignInPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  /**
   * Метод, вызываемый в момент монтирования компонента
   */
  componentDidMount(): void {
    document.title = 'Войти в систему';
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    return (
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
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомнить"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Войти
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
    );
  }
}

export default withStyles(styles)(SignInPage);
