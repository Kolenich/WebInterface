import { makeStyles, TableCell, Typography } from '@material-ui/core';
import 'filepond/dist/filepond.min.css';
import { toBase64 } from 'lib/utils';
import React from 'react';
import { File, FilePond } from 'react-filepond';
import { IProps } from '../../types';
import { styles } from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент ячейки для столбцов с файлом
 * @param onValueChange функция, обрабатывающая изменение
 * @param readOnly флаг "только на чтение"
 * @returns {*}
 * @constructor
 */
const FileCell = ({ onValueChange, disabled }: IProps) => {
  const classes = useStyles();
  const onFileUpdate = async (files: File[]) => {
    if (files.length) {
      // Достаем файл
      const { file } = files[0];
      // Конвертируем его в base64 строку
      const base64: string = await toBase64(file) as string;
      const base64File: string = base64.split(';base64,')[1];
      // Вызываем колбэк
      onValueChange(base64File);
    } else {
      onValueChange(undefined);
    }
  };
  const style = {
    display: disabled
      ?
      'none'
      :
      'block',
  };
  return (
    <TableCell>
      <Typography component="div" style={style}>
        <FilePond
          className={classes.fileUploader}
          allowRevert={false}
          onupdatefiles={onFileUpdate}
          labelIdle='<span class="filepond--label-action">Нажмите</span>, чтобы выбрать'
          labelFileProcessing="Подождите, файл загружается..."
          labelFileProcessingError="Не удалось загрузить файл"
          labelFileProcessingComplete="Загрузка завершена"
          labelTapToCancel="Нажмите, чтобы отменить"
          labelTapToRetry="Нажмите, чтобы попробовать снова"
        />
      </Typography>
    </TableCell>
  );
};

export default FileCell;
