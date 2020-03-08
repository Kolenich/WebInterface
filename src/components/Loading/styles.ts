import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = () => createStyles({
  loadingShading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, .3)',
  },
  loadingIcon: {
    position: 'absolute',
    fontSize: 20,
    top: 'calc(45% - 10px)',
    left: 'calc(50% - 10px)',
  },
});

export default styles;
