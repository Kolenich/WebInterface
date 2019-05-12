import { session } from './session';
import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import { Table } from './types';

export default {
  getContent<dataType>(table: Table, sendData?: dataType): AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let data = sendData;
      if (!sendData) data = {} as dataType;
      session
        .get<dataType>(`api/${table}/`, { data })
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  sendContent<dataType>(table: string, sendData: dataType, id?: number, sendMethod?: string):
    AxiosPromise<dataType> {
    return new Promise<AxiosResponse<dataType>>((resolve, reject) => {
      let method = sendMethod;
      let data = sendData;
      let url: string = `api/${table}/${id}/`;
      if (!method) method = 'post';
      if (!data) data = {} as dataType;
      if (!id) url = `api/${table}/`;
      session({ method, data, url })
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
};
