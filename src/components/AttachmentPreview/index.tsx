import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, memo } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

const AttachmentPreview: FC<IProps> = ({ attachment }: IProps) => {
  const classes = useStyles();

  return (
    <Link variant="body2" className={classes.preview} href={attachment.file as string}>
      {attachment.file_name}
    </Link>
  );
};

export default memo(AttachmentPreview);
