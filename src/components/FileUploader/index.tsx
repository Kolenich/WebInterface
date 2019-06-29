import React, { PureComponent, ReactNode } from 'react';
import { File as FileType, FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Props, State } from './types';
import { Avatar } from '../../lib/types';
import { getBase64, toDataURL } from '../../lib/utils';

class FileUploader extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fileLoaded: false,
    };
  }

  private pond: FilePond = new FilePond({});

  onAddFile = (file: FileType) => {
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
    const { avatarUrl } = this.props;
    const { fileLoaded } = this.state;
    if (prevProps.avatarUrl !== avatarUrl && avatarUrl !== null && !fileLoaded) {
      toDataURL(avatarUrl, this.dataUrlCallback);
    }
  }

  onRemoveFile = (file: FileType): void => {
    const { fileRemoveCallback } = this.props;
    fileRemoveCallback();
  }

  addRef = (ref: FilePond) => {
    this.pond = ref;
  }

  dataUrlCallback = (dataUrl: FileType) => {
    this.pond.addFile(dataUrl);
  }

  public render(): ReactNode {
    return (
      <FilePond
        ref={this.addRef}
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
