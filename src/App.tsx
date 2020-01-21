import { MuiThemeProvider } from '@material-ui/core';
import { Done, Error } from '@material-ui/icons';
import ContextProvider from 'context';
import theme from 'lib/theme';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

/**
 * Компонент приложения
 * @returns {JSX.Element}
 * @constructor
 */
const App: FC = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        preventDuplicate
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
  </BrowserRouter>
);

export default App;
