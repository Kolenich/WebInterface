import { createMuiTheme, Theme } from '@material-ui/core';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c9339',
    },
    secondary: {
      main: '#ff8a82',
      contrastText: '#fff',
    },
    error: {
      dark: '#ff793a',
      main: '#333',
      contrastText: '#fff',
    },
  },
});
