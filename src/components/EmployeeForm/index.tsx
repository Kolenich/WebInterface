import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';
import { Cancel } from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';
import React, { ChangeEvent, ComponentState, PureComponent, ReactNode } from 'react';
import api from '../../lib/api';
import Button from '../../lib/generic/Button';
import { IButtonIcon } from '../../lib/generic/Button/types';
import DateField from '../../lib/generic/DateField';
import Select from '../../lib/generic/Select';
import StatusWindow from '../../lib/generic/StatusWindow';
import TextField from '../../lib/generic/TextField';
import { HTTPMethods, IEmployee, ISelectElement, Sex } from '../../lib/types';
import { deepCopy, employeeLabels, SERVER_RESPONSES, sexChoices } from '../../lib/utils';
import { styles } from './styles';
import { IProps, IState } from './types';

// Переменная, отвечающая за расстояние между TextField'ми
const spacing: GridSpacing = 2;

/**
 * Класс Формы для создания/редактирования Сотрудника
 */
class EmployeeForm extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      employee: {
        first_name: '',
        last_name: '',
        email: '',
        sex: '',
        middle_name: null,
        phone: null,
        organization: null,
        date_of_birth: null,
        registration_date: null,
        avatar: null,
      },
      dateOfBirthNotNull: false,
      statusWindowOpen: false,
      statusMessage: '',
      statusType: 'loading',
    };
  }

  /**
   * Метод, вызываемый после обнолвения компонента
   */
  public componentDidUpdate(prevProps: Readonly<IProps>): ComponentState {
    const { id } = this.props;
    if (prevProps.id !== id) {
      if (id !== -1) {
        api.getContent<IEmployee>(`employee/${id}`)
          .then(((response: AxiosResponse<IEmployee>) => {
            this.setState((state: IState) => (
              { ...state, employee: response.data, dateOfBirthNotNull: true }
            ));
          }))
          .catch();
      } else {
        this.setState((state: IState) => (
          {
            ...state,
            employee: {
              first_name: '',
              last_name: '',
              email: '',
              sex: '',
              middle_name: null,
              phone: null,
              organization: null,
              date_of_birth: null,
              registration_date: null,
              avatar: null,
            },
            dateOfBirthNotNull: false,
            statusWindowOpen: false,
            statusMessage: '',
          }
        ));
      }
    }
  }

  /**
   * Функция-колбэк, закрывающая окно статуса
   */
  private closeStatusModal = (): ComponentState => {
    const { onClose } = this.props;
    const { statusType } = this.state;
    this.setState((state: IState) => ({ ...state, statusWindowOpen: false }));
    if (statusType === 'success') {
      this.setState((state: IState) => ({
        ...state,
        employee: {
          first_name: '',
          last_name: '',
          email: '',
          sex: '',
          middle_name: null,
          phone: null,
          organization: null,
          date_of_birth: null,
          registration_date: null,
          avatar: null,
        },
      }));
      onClose();
    }
  }

  /**
   * Функция, обрабатывающая изменения в селекторе
   * @param event - ивент изменения
   */
  private handleSelectChange = (event: ChangeEvent<ISelectElement>): ComponentState => {
    const sex: Sex = event.target.value as Sex;
    this.setState((state: IState) => ({ ...state, employee: { ...state.employee, sex } }));
  }

  /**
   * Функция, обрабатывающая изменения в компоненте выбора даты
   * @param name - имя поля для изменения
   */
  private handleDateChange = (name: keyof IEmployee) => (date: MaterialUiPickersDate):
    ComponentState => {
    this.setState((state: IState) => ({
      ...state,
      employee: {
        ...state.employee,
        [name]: moment(date as Date).format('YYYY-MM-DD'),
      },
      dateOfBirthNotNull: date !== null,
    }));
  }

  /**
   * Функция, обрабатывающая изменения в поле ввода
   * @param event - ивент изменения
   */
  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): ComponentState => {
    const { value, name } = event.target;
    this.setState((state: IState) => ({
      ...state,
      employee: {
        ...state.employee, [name]: value,
      },
    }));
  }

  /**
   * Функция, посылающая запрос на сервер для удаления записи из БД
   */
  private deleteForm = (): ComponentState => {
    this.setState({ statusWindowOpen: true, statusType: 'loading' });
    const { employee } = this.state;
    const { updateTable } = this.props;
    const url: string = `employee/${employee.id}`;
    const method: HTTPMethods = 'delete';
    api.sendContent<IEmployee>(url, employee, method)
      .then((response: AxiosResponse<IEmployee>) => {
        updateTable();
        this.setState((state: IState) => ({
          ...state,
          statusWindowOpen: true,
          statusMessage: SERVER_RESPONSES[response.status],
          statusType: 'success',
        }));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const statusMessage: string = SERVER_RESPONSES[error.response.status];
          this.setState((state: IState) => ({
            ...state,
            statusMessage,
            statusWindowOpen: true,
            statusType: 'error',
          }));
        }
      });
  }

  /**
   * Функция, отправляющая запрос на сервер для создания или обновления записи в БД
   */
  private submitForm = (): ComponentState => {
    this.setState((state: IState) => ({
      ...state, statusWindowOpen: true, statusType: 'loading',
    }));
    const { updateTable } = this.props;
    const { employee } = deepCopy<IState>(this.state);
    Object.keys(employee).map((field: keyof IEmployee): void => {
      if (employee[field] === '') {
        employee[field] = null;
      }
      return undefined;
    });
    let url: string = 'employee';
    let method: HTTPMethods = 'post';
    if (employee.id) {
      url = `employee/${employee.id}`;
      method = 'patch';
    }
    api.sendContent<IEmployee>(url, employee, method)
      .then((response: AxiosResponse<IEmployee>) => {
        updateTable();
        this.setState((state: IState) => ({
          ...state,
          statusMessage: SERVER_RESPONSES[response.status],
          statusWindowOpen: true,
          statusType: 'success',
        }));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const statusMessage: string = SERVER_RESPONSES[error.response.status];
          this.setState((state: IState) => ({
            ...state,
            statusMessage,
            statusWindowOpen: true,
            statusType: 'error',
          }));
        }
      });
  }

  /**
   * Функция удаления аватара по id
   * @param id первичный ключ аватара в БД
   */
  private deleteAvatar = (id: number | undefined) => () => {
    const { updateTable } = this.props;
    api.sendContent(`avatar/${id}`, {}, 'delete')
      .then(() => {
        updateTable();
        this.setState((state: IState) => ({
          ...state,
          statusWindowOpen: true,
          statusType: 'success',
          statusMessage: 'Аватар удален успешно!',
          employee: { ...state.employee, avatar: null },
        }));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const statusMessage: string = SERVER_RESPONSES[error.response.status];
          this.setState((state: IState) => ({
            ...state,
            statusMessage,
            statusWindowOpen: true,
            statusType: 'error',
          }));
        }
      });
  }

  /**
   * Функция, обрабатывающая ошибку при вводе в поле даты
   */
  handleDateError = (): ComponentState => (
    this.setState((state: IState) => ({ ...state, dateOfBirthNotNull: false }))
  )

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { id, onClose, open, classes } = this.props;
    const { statusWindowOpen, statusMessage, statusType, employee } = this.state;
    let title: string = 'Зарегистрировать сотрудника';
    let saveButtonText: string = 'Создать';
    let saveButtonIcon: IButtonIcon = 'add';
    if (id !== -1) {
      title = 'Редактировать сотрудника';
      saveButtonText = 'Сохранить';
      saveButtonIcon = 'save';
    }
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {title}
          <IconButton className={classes.cancelButton} onClick={onClose}>
            <Cancel />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <StatusWindow
            open={statusWindowOpen}
            onClose={this.closeStatusModal}
            status={statusType}
            message={statusMessage}
          />
          <Grid container spacing={spacing}>
            <TextField
              xs={12}
              lg={4}
              name="last_name"
              required
              validationType="cyrillic"
              label={employeeLabels.last_name}
              fieldValue={employee.last_name}
              onChange={this.handleInputChange}
            />
            <TextField
              xs={12}
              lg={4}
              name="first_name"
              required
              validationType="cyrillic"
              label={employeeLabels.first_name}
              fieldValue={employee.first_name}
              onChange={this.handleInputChange}
            />
            <TextField
              xs={12}
              lg={4}
              name="middle_name"
              validationType="cyrillic"
              label={employeeLabels.middle_name}
              fieldValue={employee.middle_name}
              onChange={this.handleInputChange}
            />
            <TextField
              xs={12}
              lg={6}
              name="email"
              required
              validationType="email"
              label={employeeLabels.email}
              fieldValue={employee.email}
              onChange={this.handleInputChange}
            />
            <TextField
              xs={12}
              lg={6}
              name="phone"
              validationType="phone"
              label={employeeLabels.phone}
              fieldValue={employee.phone}
              onChange={this.handleInputChange}
            />
            <Select
              value={employee.sex}
              xs={12}
              lg={6}
              handleChange={this.handleSelectChange}
              items={sexChoices}
              label="Пол"
              required
            />
            <DateField
              xs={12}
              lg={6}
              value={employee.date_of_birth}
              onChange={this.handleDateChange('date_of_birth')}
              label="Дата рождения"
              onError={this.handleDateError}
            />
            {employee.avatar &&
            <>
              <Grid item xs={12} lg={12} className={classes.gridItem}>
                <Typography variant="subtitle1">
                  Аватар
                </Typography>
              </Grid>
              <Grid item xs={12} lg={3} className={classes.gridItem}>
                <Avatar
                  className={classes.avatar}
                  src={employee.avatar.file}
                  alt={employee.first_name}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Button onClick={this.deleteAvatar(employee.avatar.id)} variant="outlined"
                        text="Удалить" color="secondary" icon="delete" />
              </Grid>
            </>}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            text={saveButtonText}
            icon={saveButtonIcon}
            onClick={this.submitForm}
          />
          {id !== -1 &&
          <Button color="secondary" text="Удалить" icon="delete" onClick={this.deleteForm} />}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EmployeeForm);
