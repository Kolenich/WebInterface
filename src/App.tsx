import { MuiThemeProvider } from '@material-ui/core';
import { Done, Error } from '@material-ui/icons';
import ContextProvider from 'context';
import theme from 'lib/theme';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from './router';

/**
 * Компонент приложения
 * @returns {JSX.Element}
 * @constructor
 */
const App: FC = () => (
  <HashRouter hashType="noslash">
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        iconVariant={{
          success: <Done fontSize="large" style={{ paddingRight: 10 }}/>,
          error: <Error fontSize="large" style={{ paddingRight: 10 }}/>,
        }}
      >
        <ContextProvider>
          <Router/>
        </ContextProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  </HashRouter>
);

export default App;
