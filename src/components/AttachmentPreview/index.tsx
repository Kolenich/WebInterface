import { Button, Tooltip } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { download } from '../../lib/utils';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент отображения влождения по ссылке
 * @param {IAttachment} attachment объект вложения
 * @returns {JSX.Element}
 * @constructor
 */
const AttachmentPreview: FC<IProps> = ({ attachment }) => {
  const classes = useStyles();

  /**
   * Оработчик клика по кнопке
   */
  const handleClick = () => download(attachment.file as string, attachment.file_name);

  return (
    <Tooltip arrow title={attachment.file_name} classes={classes}>
      <Button
        startIcon={<FileCopy/>}
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        {attachment.file_name.slice(0, 10)}...
      </Button>
    </Tooltip>

  );
};

export default AttachmentPreview;
