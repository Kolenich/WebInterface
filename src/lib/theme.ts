import { createMuiTheme, Theme } from '@material-ui/core';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(50, 167, 76)',
      contrastText: 'rgb(255, 255, 255)',
    },
    secondary: {
      main: 'rgb(102, 137, 225)',
      contrastText: 'rgb(255, 255, 255)',
    },
    error: {
      main: 'rgb(213,32,42)',
      contrastText: 'rgb(255, 255, 255)',
    },
  },
  typography: {
    h6: {
      fontStyle: 'italic',
      color: 'rgb(172, 170, 170)',
    },
  },
});

export default theme;
