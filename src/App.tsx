import { IconButton, makeStyles, MuiThemeProvider } from '@material-ui/core';
import { Cancel, Done, Error } from '@material-ui/icons';
import GlobalContext from 'components/GlobalContext';
import Router from 'components/Routers';
import { DialogProvider } from 'dialog-notification';
import theme from 'lib/theme';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React, { FC, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент приложения
 * @returns {JSX.Element}
 * @constructor
 */
const App: FC = () => {
  const snackbarRef = useRef<SnackbarProvider>(null);

  const classes = useStyles();

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          ref={snackbarRef}
          action={(key: SnackbarKey) => (
            <IconButton color="inherit" onClick={() => snackbarRef.current?.closeSnackbar(key)}>
              <Cancel/>
            </IconButton>
          )}
          maxSnack={5}
          preventDuplicate
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
          iconVariant={{
            success: <Done fontSize="large" className={classes.snackbarIcon}/>,
            error: <Error fontSize="large" className={classes.snackbarIcon}/>,
          }}
        >
          <DialogProvider
            closeButtonText="ОК"
            acceptButtonText="Принять"
            declineButtonText="Отмена"
          >
            <GlobalContext>
              <Router/>
            </GlobalContext>
          </DialogProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

export default App;
