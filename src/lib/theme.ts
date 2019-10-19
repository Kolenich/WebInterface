import { createMuiTheme, Theme } from '@material-ui/core';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#134b29',
      contrastText: '#fff',
    },
    secondary: {
      main: '#6b8dc3',
      contrastText: '#fff',
    },
    error: {
      main: '#ff372a',
      contrastText: '#fff',
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
