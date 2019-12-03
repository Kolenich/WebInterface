import { ActualFileObject } from 'lib/types';
import { File } from 'react-filepond';

export interface IProps {
  /** Флаг множественной загрузки */
  multiple?: boolean;
  /** Максимальное количество загружаемых файлов */
  maxFiles?: number;
  /** Текстовая подсказка над загрузчиком */
  hint?: string;
  /** Текст для отображения на самом загрузчике */
  uploaderText?: string;
  /** Колбэк для передачи массива с файлами родителю */
  onFilesUpdate?: (files: (File | IBase64File)[]) => void;
  /** Флаг, определяющий перекодировку файлов в base64 */
  base64?: boolean;
  /** Адрес для отправки файла */
  uploadTo?: string;
  /** Указатель мгновенной отправки файла */
  instantUpload?: boolean;
  /** Функция, принимающая успешный ответ сервера при загрузке */
  uploadCallback?: IUploadCallback;
  /** Имя поля для упрощения на сервере доступа к файлу */
  field?: string;
  /** Функция, принимающая отрцательный ответ сервера при загрузке */
  onUploadError?: IUploadCallback;
}

type IUploadCallback<T = {}> = (data: T) => void;

export interface IBase64File {
  /** Имя файла */
  file_name: string;
  /** Тип файла */
  file_type: string;
  /** Размер файла */
  file_size: number;
  /** Base64-представление файла */
  file: string;
}

export type ProcessServerConfigFunction = (
  /** The name of the input field */
  fieldName: string,
  /** The actual file object to send */
  file: ActualFileObject,
  metadata: { [key: string]: any },
  /**
   * Should call the load method when done and pass the returned server file id.
   * This server file id is then used later on when reverting or restoring a file
   * so that your server knows which file to return without exposing that info
   * to the client.
   */
  load: (p: string | { [key: string]: any }) => void,
  /** Can call the error method is something went wrong, should exit after */
  error: (errorText: string) => void,
  /**
   * Should call the progress method to update the progress to 100% before calling load()
   * Setting computable to false switches the loading indicator to infinite mode
   */
  progress: ProgressServerConfigFunction,
  /** Let FilePond know the request has been cancelled */
  abort: () => void,
) => void;

type ProgressServerConfigFunction = (
  /**
   * Flag indicating if the resource has a length that can be calculated.
   * If not, the totalDataAmount has no significant value.  Setting this to
   * false switches the FilePond loading indicator to infinite mode.
   */
  isLengthComputable: boolean,
  /** The amount of data currently transferred */
  loadedDataAmount: number,
  /** The total amount of data to be transferred */
  totalDataAmount: number,
) => void;
