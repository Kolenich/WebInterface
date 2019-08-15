import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import 'filepond/dist/filepond.min.css';
import React, { PureComponent, ReactNode } from 'react';
import { File, FilePond } from 'react-filepond';
import { IAvatar } from '../../types';
import { getBase64, toDataURL } from '../../utils';
import { styles } from './styles';
import { IProps, IState } from './types';

/**
 * Компонент для загрузки файлов
 */
class FileUploader extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileLoaded: false,
    };
  }

  /**
   * Экземпляр компонента для доступа к его методам
   */
  private pond: FilePond = new FilePond({});

  /**
   * Функция-колбэк, срабатывающая в момент добавления файла
   * @param file объект добавленного файла
   */
  onAddFile = (file: File) => {
    const { fileUploadCallback } = this.props;
    getBase64(file.file)
      .then((data: unknown) => {
        const metaData: string = data as string;
        const avatar: IAvatar = {
          file: metaData.split(';base64,')[1],
          file_name: file.filename,
          size: file.fileSize,
          content_type: file.fileType,
        };
        this.setState({ fileLoaded: true });
        fileUploadCallback(avatar);
      });
  }

  /**
   * Метод, вызываемый в момент обновления компонента
   * @param prevProps предыдущие пропсы
   */
  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { url } = this.props;
    const { fileLoaded } = this.state;
    if (prevProps.url !== url && url !== null && !fileLoaded) {
      toDataURL(url, this.dataUrlCallback);
    }
  }

  /**
   * Функция-колбэк, вызываемая в момент удаления файла
   * @param file объект удаляемого файла
   */
  onRemoveFile = (file: File): void => {
    const { fileRemoveCallback } = this.props;
    fileRemoveCallback();
  }

  /**
   * Функция-колбэк, привязывающая экземпляр класса к ref
   * @param ref DOM-ссылка
   */
  addRef = (ref: FilePond) => {
    this.pond = ref;
  }

  /**
   * Функция-колбэк, вызываемая после преобразования файла с сервера в base64
   * @param dataUrl преобразованный файл
   */
  dataUrlCallback = (dataUrl: File) => {
    this.pond.addFile(dataUrl);
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { xs, classes, title } = this.props;
    let subTitle: string = 'Аватар';
    if (title) {
      subTitle = title;
    }
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
