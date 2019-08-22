import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import auth from 'lib/auth';
import withContext from 'lib/context';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from './styles';
import './styles.css';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонента страницы входа в систему
 */
const SignInPage: FunctionComponent<IProps> = ({ history }: IProps): JSX.Element => {
  document.title = 'Войти в систему';
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleRememberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };
  const handleLogin = (): void => {
    setLoading(true);
    auth.login(email, password, remember)
      .then((response) => {
        if (response) {
          setError(false);
          setLoading(false);
          history.push('/');
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        auth.delToken();
        auth.delHeader();
        // Убираем ошибку через 3 секунды
        setTimeout(() => setError(false), 3000);
      });
  };
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
              error={error}
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={remember}
                  name="remember"
                  onChange={handleRememberChange}
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
            <ReactCSSTransitionGroup
              transitionName="error"
              transitionAppear={false}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              transitionEnter
              transitionLeave
            >
              {error &&
              <Typography className={classes.errorMessage}>
                Неверный логин или пароль
              </Typography>}
            </ReactCSSTransitionGroup>
            <Grid container justify="flex-end">
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
};

export default withContext<IProps>(SignInPage);
