import { WithStyles } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { ComponentState } from 'react';
import { IAvatar } from '../../lib/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Функция-колбэк, возвращающая объект Аватар */
  fileUploadCallback: (avatar: IAvatar) => ComponentState;
  /** Функция-колбэк, удаляющая объект Аватар */
  fileRemoveCallback: () => ComponentState;
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
