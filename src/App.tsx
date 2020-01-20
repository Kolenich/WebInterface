import { MuiThemeProvider } from '@material-ui/core';
import ContextProvider from 'context';
import { snackbarProviderProps } from 'lib/constants';
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
      <SnackbarProvider {...snackbarProviderProps}>
        <ContextProvider>
          <Router/>
        </ContextProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  </HashRouter>
);

export default App;
