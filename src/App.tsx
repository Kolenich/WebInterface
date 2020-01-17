import { MuiThemeProvider } from '@material-ui/core';
import ContextProvider from 'context';
import { snackbarProviderProps } from 'lib/constants';
import theme from 'lib/theme';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

/**
 * Компонент приложения
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider {...snackbarProviderProps}>
        <ContextProvider>
          <Router/>
        </ContextProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
