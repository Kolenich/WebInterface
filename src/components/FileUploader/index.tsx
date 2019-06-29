import React, { PureComponent, ReactNode } from 'react';
import { File, FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Props, State } from './types';
import { Avatar } from '../../lib/types';
import { getBase64 } from '../../lib/utils';

class FileUploader extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onAddFile = (file: File) => {
    const { fileUploadCallback } = this.props;
    getBase64(file.file)
      .then((data) => {
        const metaData: string = data as string;
        const avatar: Avatar = {
          file: metaData.split(';base64,')[1],
          file_name: file.filename,
          size: file.fileSize,
          content_type: file.fileType,
        };
        fileUploadCallback(avatar);
      });
  }

  onRemoveFile = (file: File): void => {
    const { fileRemoveCallback } = this.props;
    fileRemoveCallback();
  }

  public render(): ReactNode {
    return (
      <FilePond
        labelIdle='Пертяните сюда файлы или <span class="filepond--label-action">
        нажмите</span>, чтобы выбрать'
        labelFileLoading="Подождите, файл загружается..."
        labelFileLoadError="Не удалось загрузить файл"
        labelFileProcessing="Файл успешно загружен"
        onaddfilestart={this.onAddFile}
        onremovefile={this.onRemoveFile}
      />
    );
  }
}

export default FileUploader;
