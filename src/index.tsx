import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import { Provider } from './lib/context';
import { theme } from './lib/theme';
import { unregister } from './serviceWorker';

render(
  <BrowserRouter>
    <Provider>
      <MuiThemeProvider theme={theme}>
        <MainPage />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
