import { createStyles } from '@material-ui/styles';
import { APPBAR_HEIGHT } from 'lib/constants';

/**
 * Стили Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = () => createStyles({
  paper: {
    height: window.innerHeight - APPBAR_HEIGHT,
  },
});

export default styles;
