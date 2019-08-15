import { createMuiTheme, Theme } from '@material-ui/core';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c9339',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff8a82',
      contrastText: '#fff',
    },
    error: {
      main: '#ff793a',
      contrastText: '#fff',
    },
  },
});
