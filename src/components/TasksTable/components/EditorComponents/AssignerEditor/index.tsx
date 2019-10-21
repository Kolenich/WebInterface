import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import { ISelectItem } from 'generic/Select/types';
import api from 'lib/api';
import { USERS_APP } from 'lib/session';
import { IApiResponse, ISelectElement } from 'lib/types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по заказчику
 * @param {(newValue: any) => void} onValueChange функция для обработки изменений
 * @param {any} value текущее значение
 * @returns {JSX.Element}
 * @constructor
 */
const AssignerEditor: FC<IProps> = ({ onValueChange, value }: IProps): JSX.Element => {
  const classes = useStyles();

  const [users, setUsers] = useState<ISelectItem[]>([]);

  let displayValue: string = '';
  if (value) {
    displayValue = value;
  }

  /**
   * Функция обработки изменений
   * @param {React.ChangeEvent<ISelectElement>} event объект события изменени/
   */
  const onChange = (event: ChangeEvent<ISelectElement>): void => onValueChange(event.target.value);

  /**
   * Функция выгрущзки всех юзеров в селект
   */
  const loadUsers = (): void => {
    api.getContent<IApiResponse<ISelectItem>>('user-assigner', {}, USERS_APP)
      .then((response: AxiosResponse<IApiResponse<ISelectItem>>): void => (
        setUsers(response.data.results)
      ))
      .catch();
  };

  useEffect(loadUsers, []);

  return (
    <FormControl fullWidth>
      <InputLabel className={classes.inputLabel}>
        Фильтр...
      </InputLabel>
      <Select
        className={classes.sexSelect}
        value={displayValue}
        input={<Input />}
        onChange={onChange}
      >
        <MenuItem value=""><em>Сброс</em></MenuItem>
        {users.map(({ label, ...choice }: ISelectItem): JSX.Element => (
          <MenuItem {...choice}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AssignerEditor;
