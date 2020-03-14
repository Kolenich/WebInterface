import { IconButton, makeStyles, MuiThemeProvider } from '@material-ui/core';
import { Cancel, Done, Error } from '@material-ui/icons';
import GlobalContext from 'components/GlobalContext';
import theme from 'lib/theme';
import { SnackbarKey, SnackbarProvider, WithSnackbarProps } from 'notistack';
import React, { FC, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Routers';
import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент приложения
 * @returns {JSX.Element}
 * @constructor
 */
const App: FC = () => {
  const snackbarRef = useRef<WithSnackbarProps>(null);

  const classes = useStyles();

  /**
   * Функция обработки клика на кнопку действия на снэкбаре. Закрывает снэкбар
   * @param {SnackbarKey} key уникальный ключ снэкбара
   * @return {() => void}
   */
  const dismissSnackbar = (key: SnackbarKey) => () => snackbarRef.current?.closeSnackbar(key);

  /**
   * Компонент кнопки действия на снэкбаре
   * @param key {SnackbarKey} уникальный идентификатор снэкбара
   * @return {JSX.Element}
   */
  const actionButton = (key: SnackbarKey) => (
    <IconButton color="inherit" onClick={dismissSnackbar(key)}>
      <Cancel/>
    </IconButton>
  );

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          ref={snackbarRef}
          action={actionButton}
          maxSnack={5}
          preventDuplicate
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
          iconVariant={{
            success: <Done fontSize="large" className={classes.snackbarIcon}/>,
            error: <Error fontSize="large" className={classes.snackbarIcon}/>,
          }}
        >
          <GlobalContext>
            <Router/>
          </GlobalContext>
        </SnackbarProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

export default App;
