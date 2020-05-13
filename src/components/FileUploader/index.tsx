import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import 'filepond/dist/filepond.min.css';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/constants';
import { session, source } from 'lib/session';
import { ActualFileObject } from 'lib/types';
import { toBase64, useUpdateEffect } from 'lib/utils';
import { useSnackbar } from 'notistack';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { File, FilePond } from 'react-filepond';
import './style.css';
import styles from './styles';
import { IFile, IProps, IUploaderImperativeProps, ProcessServerConfigFunction } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент-загрузчик файлов
 * @param multiple {boolean} указатель на множественность загрузки файлов
 * @param maxFiles {number} максимальное количество файлов (если стоит флаг multiple)
 * @param hint {string} текстовая подсказка над загрузчиком
 * @param uploaderText {string} текст для отображения на самом загрузчике
 * @param onFilesUpdate {(files:IFile[]) => void} колбэк для передачи массива с
 * файлами родителю
 * @param base64 {boolean} флаг, определяющий перекодировку файлов в base64
 * @param uploadTo {string} адрес для отправки файла
 * @param instantUpload {boolean} указатель мгновенной загрузки файла
 * @param uploadCallback {IUploadCallback} функция, принимающая данные с сервера при успешной
 * загрузке
 * @param field {string} имя поля для упрощения получения доступа  кфайлу в БД
 * @param onUploadError {IUploadCallback} функция, принимающая данные с сервера при неуспешной
 * загрузке
 * @param {React.Ref<IUploaderImperativeProps>} ref ссылка для доступа к компоненту
 * @returns {JSX.Element}
 * @constructor
 */
const FileUploader: ForwardRefRenderFunction<IUploaderImperativeProps, IProps> = (
  {
    multiple, maxFiles = 1, hint, uploaderText = 'Перетяните сюда файл или <span class="filepond--label-action">нажмите</span>, чтобы выбрать', onFilesUpdate, base64, uploadTo, instantUpload,
    uploadCallback, field, onUploadError,
  },
  ref,
) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [files, setFiles] = useState<IFile[]>([]);

  const pondRef = useRef<FilePond>(null);

  /**
   * Функция обработки обновления файлов в дроп-зоне
   * @param newFiles {File[]} обновленной массив файлов
   */
  const onUpdateFiles = async (newFiles: File[]) => {
    const files: IFile[] = await Promise.all(newFiles.map(async (file: File) => {
      const { filename: file_name, fileType: file_mime, fileSize: file_size } = file;
      let fileObject: string | ActualFileObject = file.file;
      // Если передан флаг base64, перекодируем файлы в base64
      if (base64) {
        fileObject = await toBase64(file.file);
      }
      return { file_name, file_mime, file_size, file: fileObject };
    }));
    setFiles([...files]);
  };

  /**
   * Эффект для передачи файлов через колбэк родителю
   */
  const flowToParent = () => {
    if (onFilesUpdate) {
      onFilesUpdate(files);
    }
  };

  /**
   * Функция-конфиг для формирования запроса на отправку файла на сервер. Комменты взяты с
   * официального сайта.
   * @param {string} fieldName имя поля объекта файла в запросе. По умолчанию filepond
   * @param {ActualFileObject} file сам объект файла
   * @param metadata метаданные
   * @param load функция-колбэк, срабатывающая после загрузки файлов на сервер
   * @param {(errorText: string) => void} error функция-колбэк, срабатывающая в случае ошибки
   * загрузки файлов
   * @param {ProgressServerConfigFunction} progress функция-колбэк, срабатывающая после загрузки
   * файлов
   * @param {() => void} abort функция-колбэк, срабатывающая в случае отмены пользователем
   * зарузки файла на сервер
   * @returns {Promise<{abort: () => void}>}
   */
  const process: ProcessServerConfigFunction =
    async (fieldName, file, metadata, load, error, progress, abort) => {
      // Настройка обработчика процесса отправки
      session.defaults.onUploadProgress = ({ lengthComputable, loaded, total }) => (
        progress(lengthComputable, loaded, total)
      );
      session.defaults.headers['Content-Type'] = 'multipart/form-data';
      // Формируем тело запроса
      const formData = new FormData();
      formData.append(fieldName, file, file.name);
      if (field) {
        formData.append('field', field);
      }
      // Отправляем запрос
      try {
        const { data } = await session.post(uploadTo!, formData);
        load(data);
        // Возвращаем настройки сессии в исходное положение
        session.defaults.onUploadProgress = undefined;
        session.defaults.headers['Content-Type'] = 'application/json';
        if (uploadCallback) {
          uploadCallback(data);
        }
      } catch (err) {
        error(err);
        let message = SERVER_NOT_AVAILABLE;
        if (err.response) {
          message = SERVER_RESPONSES[err.response.status];
          if (err.response.data.message) {
            ({ message } = err.response.data);
          }
        }
        enqueueSnackbar(message, { variant: 'error' });
        // Возвращаем настройки сессии в исходное положение
        session.defaults.onUploadProgress = undefined;
        session.defaults.headers['Content-Type'] = 'application/json';
        if (onUploadError && err.response) {
          onUploadError(err.response.data);
        }
      }
      // Возвращаем метод для остановки запроса
      return {
        abort: () => {
          // Функция вызывается в случае, если нажата отмена запроса
          source.cancel();
          // Посылаем сигнал компоненту, что запрос остановлен
          abort();
        },
      };
    };

  useImperativeHandle(ref, () => ({
    removeFiles: pondRef.current!.removeFiles,
  }));

  useUpdateEffect(flowToParent, [files]);

  return (
    <>
      <Typography className={classes.hint}>
        {hint}
      </Typography>
      <FilePond
        ref={pondRef}
        instantUpload={instantUpload}
        server={uploadTo && { process }}
        labelIdle={uploaderText}
        allowMultiple={multiple}
        maxFiles={maxFiles}
        onupdatefiles={onUpdateFiles}
        labelFileProcessing="Подождите, файл загружается..."
        labelFileProcessingError="Не удалось загрузить файл"
        labelFileProcessingComplete="Загрузка завершена"
        labelTapToCancel="Нажмите, чтобы отменить"
        labelTapToRetry="Нажмите, чтобы попробовать снова"
        labelFileProcessingAborted="Загрузка файла прервана"
      />
    </>
  );
};

export default forwardRef(FileUploader);
