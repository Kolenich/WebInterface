import { MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import { ISelectItem } from 'components/Select/types';
import api from 'lib/api';
import { USERS_APP } from 'lib/session';
import { ISelectElement } from 'lib/types';
import { useMountEffect } from 'lib/utils';
import React, { ChangeEvent, FC, useState } from 'react';
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
const AssignerEditor: FC<IProps> = ({ onValueChange, value = '' }: IProps) => {
  const classes = useStyles();

  const [users, setUsers] = useState<ISelectItem[]>([]);

  /**
   * Функция обработки изменений
   * @param {React.ChangeEvent<ISelectElement>} event объект события изменени/
   */
  const onChange = (event: ChangeEvent<ISelectElement>) => onValueChange(event.target.value);

  /**
   * Функция выгрущзки всех юзеров в селект
   */
  const loadUsers = () => {
    api.getContent<ISelectItem[]>('profile/assigner', {}, USERS_APP)
      .then((response: AxiosResponse<ISelectItem[]>) => (
        setUsers(response.data)
      ))
      .catch();
  };

  useMountEffect(loadUsers);

  return (
    <TextField
      value={value}
      onChange={onChange}
      className={classes.select}
      select
      fullWidth
      label="Фильтр..."
    >
      <MenuItem value=""><em>Сброс</em></MenuItem>
      {users.map(({ label, ...choice }: ISelectItem) => (
        <MenuItem {...choice}>{label}</MenuItem>
      ))}
    </TextField>
  );
};

export default AssignerEditor;