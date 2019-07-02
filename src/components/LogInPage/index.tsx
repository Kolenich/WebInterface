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
import React, { PureComponent, ReactNode } from 'react';
import { styles } from './styles';
import { IProps, IState } from './types';

/**
 * Компонента страницы входа в систему
 */
class SignInPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
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
              control={<Checkbox value="remember" color="primary"/>}
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
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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
