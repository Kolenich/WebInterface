import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import api from 'lib/api';
import { ISelectItem } from 'lib/generic/Select/types';
import { USERS_APP } from 'lib/session';
import { IApiResponse, ISelectElement } from 'lib/types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по заказчику
 * @param onValueChange функция для обработки изменений
 * @param value текущее значение
 */
const AssignerEditor: FC<IProps> = ({ onValueChange, value }: IProps):
  JSX.Element => {
  const classes = useStyles();

  const [users, setUsers] = useState<ISelectItem[]>([]);

  let displayValue: string = '';
  if (value) {
    displayValue = value;
  }

  const onChange = (event: ChangeEvent<ISelectElement>): void => onValueChange(event.target.value);

  const loadUsers = (): void => {
    api.getContent<IApiResponse<ISelectItem>>('user-assigner', {}, USERS_APP)
      .then((response: AxiosResponse<IApiResponse<ISelectItem>>) => setUsers(response.data.results))
      .catch();
  };

  useEffect(
    loadUsers,
    [],
  );

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
        {users.map(({ label, ...choice }: ISelectItem) => (
          <MenuItem {...choice}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AssignerEditor;
