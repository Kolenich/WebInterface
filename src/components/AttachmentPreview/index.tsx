import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент отображения влождения по ссылке
 * @param {IAttachment} attachment объект вложения
 * @returns {JSX.Element}
 * @constructor
 */
const AttachmentPreview: FC<IProps> = ({ attachment }: IProps) => {
  const classes = useStyles();

  return (
    <Link
      variant="body2"
      className={classes.preview}
      href={attachment.file as string}
      target="_blank"
      rel="noreferrer noreferer"
    >
      {attachment.file_name}
    </Link>
  );
};

export default AttachmentPreview;
