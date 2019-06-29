import React, { PureComponent, ReactNode } from 'react';
import { File, FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Props, State } from './types';
import { Avatar } from '../../lib/types';
import { getBase64, toDataURL } from '../../lib/utils';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

class FileUploader extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fileLoaded: false,
    };
  }

  private pond: FilePond = new FilePond({});

  onAddFile = (file: File) => {
    const { fileUploadCallback } = this.props;
    getBase64(file.file)
      .then((data: unknown) => {
        const metaData: string = data as string;
        const avatar: Avatar = {
          file: metaData.split(';base64,')[1],
          file_name: file.filename,
          size: file.fileSize,
          content_type: file.fileType,
        };
        this.setState({ fileLoaded: true });
        fileUploadCallback(avatar);
      });
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { url } = this.props;
    const { fileLoaded } = this.state;
    if (prevProps.url !== url && url !== null && !fileLoaded) {
      toDataURL(url, this.dataUrlCallback);
    }
  }

  onRemoveFile = (file: File): void => {
    const { fileRemoveCallback } = this.props;
    fileRemoveCallback();
  }

  addRef = (ref: FilePond) => {
    this.pond = ref;
  }

  dataUrlCallback = (dataUrl: File) => {
    this.pond.addFile(dataUrl);
  }

  public render(): ReactNode {
    const { xs, classes, title } = this.props;
    let subTitle: string = 'Аватар';
    if (title) subTitle = title;
    return (
      <Grid item xs={xs}>
        <Typography variant="subtitle1" className={classes.subTitle}>
          {subTitle}
        </Typography>
        <FilePond
          className={classes.fileUploader}
          ref={this.addRef}
          labelIdle='Перетяните сюда файл или <span class="filepond--label-action">
        нажмите</span>, чтобы выбрать'
          labelFileLoading="Подождите, файл загружается..."
          labelFileLoadError="Не удалось загрузить файл"
          labelFileProcessing="Файл успешно загружен"
          onaddfilestart={this.onAddFile}
          onremovefile={this.onRemoveFile}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(FileUploader);
