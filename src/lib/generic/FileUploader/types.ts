import { GridSize } from '@material-ui/core/Grid';
import { WithStyles } from '@material-ui/styles';
import { IAvatar } from '../../types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Функция-колбэк, возвращающая объект Аватар */
  fileUploadCallback: (avatar: IAvatar) => void;
  /** Функция-колбэк, удаляющая объект Аватар */
  fileRemoveCallback: () => void;
  /** URL для загрузки файла */
  url: string | null;
  /** Размер в Grid-сетке */
  xs: GridSize;
  /** Подзаголовок */
  title?: string;
}

export interface IState {
  /** Указатель загрузки файла */
  fileLoaded: boolean;
}
