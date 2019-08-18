import { createMuiTheme, Theme } from '@material-ui/core';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c9339',
      contrastText: '#fff',
    },
    secondary: {
      main: '#c32f28',
      contrastText: '#fff',
    },
    error: {
      main: '#ff793a',
      contrastText: '#fff',
    },
  },
  typography: {
    h5: {
      fontStyle: 'italic',
      color: 'rgb(172, 170, 170)',
    },
  },
});
