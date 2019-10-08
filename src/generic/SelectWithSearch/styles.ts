import { Theme } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: theme.spacing(1),
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    padding: theme.spacing(1),
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
    textAlign: 'center',
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

export default styles;
