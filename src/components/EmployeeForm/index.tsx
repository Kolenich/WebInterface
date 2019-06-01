import React, { ChangeEvent, ComponentState, Component, ReactElement, ReactNode } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  Dialog,
} from '@material-ui/core';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { CustomButtonProps, Employee, Sex } from '../../lib/types';
import { GridSpacing } from '@material-ui/core/Grid';
import { employeeLabel } from '../../lib/utils';
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import moment from 'moment';
import { validationMessages, validationMethods } from '../../lib/validation';
import { Add, Cancel, Delete, Done, Save, Update } from '@material-ui/icons';
import api from '../../lib/api';
import { AxiosError, AxiosResponse } from 'axios';
import { InputFieldProps, Props, State } from './types';
import StatusWindow from '../StatusWindow';

// Переменная, отвечающая за расстояние между TextField'ми
const spacing: GridSpacing = 16;

// Сообщения статусов
const UPDATE_SUCCESS: string = 'Сохранение прошло успешно!';
const SAVE_SUCCESS: string = 'Создание прошло успешно!';
const DELETE_SUCCESS: string = 'Удаление прошло успешно';
const SERVER_ERROR: string = 'Ошибка на сервере';

class EditEmployee extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      employee: {
        first_name: '',
        last_name: '',
        email: '',
        sex: '',
        middle_name: null,
        phone: null,
        attachment: null,
        age: 0,
        organization: null,
        date_of_birth: '',
        registration_date: '',
      },
      dateOfBirthNotNull: false,
      statusWindowOpen: false,
      statusMessage: '',
      statusType: 'loading',
    };
  }

  public componentDidUpdate(prevProps: Readonly<Props>): ComponentState {
    const { id } = this.props;
    if (prevProps !== this.props) {
      if (id !== -1) {
        api.getContent<Employee>(`employees/${id}`)
          .then(((response: AxiosResponse<Employee>) => {
            this.setState({ employee: response.data, dateOfBirthNotNull: true });
          }))
          .catch();
      } else {
        this.setState({
          employee: {
            first_name: '',
            last_name: '',
            email: '',
            sex: '',
            middle_name: null,
            phone: null,
            attachment: null,
            age: 0,
            organization: null,
            date_of_birth: '',
            registration_date: '',
          },
          dateOfBirthNotNull: false,
          statusWindowOpen: false,
          statusMessage: '',
        });
      }
    }
  }

  InputField = (props: InputFieldProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const { employee } = { ...this.state };
    const value: string = employee[props.fieldName] !== null && employee[props.fieldName] ?
      String(employee[props.fieldName]) :
      '';
    let valid: boolean = true;
    let helperText: string = '';
    if (props.validationType && value !== '') {
      if (value) {
        valid = validationMethods[props.validationType](value);
      }
      if (!valid) helperText = validationMessages[props.validationType];
    }
    return (
      <Grid item xs={props.xs}>
        <TextField
          label={employeeLabel[props.fieldName]}
          placeholder={employeeLabel[props.fieldName]}
          className={classes.textField}
          name={String(props.fieldName)}
          error={!valid}
          helperText={helperText}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleAttributeChange(props.fieldName)}
          value={value}
          required={props.required}
        />
      </Grid>
    );
  }

  DateField = (props: InputFieldProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const { employee } = { ...this.state };
    const value: string | null = employee[props.fieldName] !== null && employee[props.fieldName] ?
      String(employee[props.fieldName]) :
      null;
    return (
      <Grid item xs={props.xs}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <InlineDatePicker
            clearable
            openTo="year"
            views={['year', 'month', 'day']}
            className={classes.datePicker}
            margin="normal"
            variant="outlined"
            label={employeeLabel[props.fieldName]}
            value={value}
            onChange={this.handleDateChange(props.fieldName)}
            format="dd.MM.yyyy"
            keyboard
            disableFuture
            invalidDateMessage="Дата должна быть в формате ДД.ММ.ГГГГ"
            minDateMessage="Дата не должна быть меньше 01.01.1900"
            maxDateMessage="Дата не должна превышать сегодняшнее число"
          />
        </MuiPickersUtilsProvider>
      </Grid>
    );
  }

  SelectField = (props: InputFieldProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const { employee } = { ...this.state };
    const value: string = employee[props.fieldName] !== null && employee[props.fieldName] ?
      String(employee[props.fieldName]) :
      '';
    return (
      <Grid item xs={props.xs}>
        <FormControl variant="outlined" className={classes.formControl} required={props.required}>
          <InputLabel htmlFor="sex">Пол</InputLabel>
          <Select
            value={value}
            onChange={this.handleSelectChange}
            input={<OutlinedInput labelWidth={30} id="sex"/>}>
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }

  PrimaryButton = (buttonProps: CustomButtonProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const { employee, dateOfBirthNotNull } = this.state;
    const disabled: boolean =
      validationMethods.cyrillic(employee.first_name) &&
      validationMethods.cyrillic(employee.last_name) &&
      validationMethods.email(employee.email) &&
      dateOfBirthNotNull &&
      employee.sex !== '';
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={!disabled}
        {...buttonProps}
      >
        {buttonProps.text}
        {buttonProps.icon === 'save' &&
        <Save className={classes.rightIcon}/>}
        {buttonProps.icon === 'add' &&
        <Add className={classes.rightIcon}/>}
        {buttonProps.icon === 'confirm' &&
        <Done className={classes.rightIcon}/>}
        {buttonProps.icon === 'update' &&
        <Update className={classes.rightIcon}/>}
      </Button>
    );
  }

  SecondaryButton = (buttonProps: CustomButtonProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        {...buttonProps}
      >
        {buttonProps.text}
        {buttonProps.icon === 'delete' &&
        <Delete className={classes.rightIcon}/>}
        {buttonProps.icon === 'cancel' &&
        <Cancel className={classes.rightIcon}/>}
      </Button>
    );
  }

  private closeStatusModal = (): ComponentState => {
    const { onCLose } = this.props;
    const { statusType } = this.state;
    this.setState({ statusWindowOpen: false });
    if (statusType === 'success') onCLose();
  }

  private handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): ComponentState => {
    const sex: Sex = event.target.value as Sex;
    const { employee } = { ...this.state };
    this.setState({ employee: { ...employee, sex } });
  }

  private handleDateChange = (name: keyof Employee) => (date: Date): ComponentState => {
    const { employee } = { ...this.state };
    if (date !== null) {
      this.setState({ employee: { ...employee, [name]: date }, dateOfBirthNotNull: true });
    } else {
      this.setState({ employee: { ...employee, [name]: date }, dateOfBirthNotNull: false });
    }
  }

  private handleAttributeChange =
    (name: keyof Employee) => (event: ChangeEvent<HTMLInputElement>): ComponentState => {
      const { employee } = { ...this.state };
      this.setState({ employee: { ...employee, [name]: event.target.value } });
    }

  private deleteForm = (): ComponentState => {
    this.setState({ statusWindowOpen: true, statusType: 'loading' });
    const { employee } = { ...this.state };
    const { deleteRecord } = this.props;
    const url: string = `employees/${employee.id}`;
    const method: string = 'delete';
    api.sendContent<Employee>(url, employee, method)
      .then(() => {
        if (employee.id) deleteRecord(employee.id);
        this.setState({
          statusWindowOpen: true,
          statusMessage: DELETE_SUCCESS,
          statusType: 'success',
        });
      })
      .catch((error: AxiosError) => {
        this.setState({
          statusWindowOpen: true,
          statusMessage: SERVER_ERROR,
          statusType: 'error',
        });
        if (error.response) console.log(error.response.data);
      });
  }

  private submitForm = (): ComponentState => {
    this.setState({ statusWindowOpen: true, statusType: 'loading' });
    const { updateTable } = this.props;
    const { employee } = { ...this.state };
    // eslint-disable-next-line
    Object.keys(employee).map((field: keyof Employee): void => {
      if (employee[field] === '') employee[field] = null;
    });
    employee.date_of_birth = moment(employee.date_of_birth).format('YYYY-MM-DD');
    let statusMessage: string = SAVE_SUCCESS;
    let url: string = 'employees';
    let method: string = 'post';
    if (employee.id) {
      url = `employees/${employee.id}`;
      statusMessage = UPDATE_SUCCESS;
      method = 'patch';
    }
    api.sendContent<Employee>(url, employee, method)
      .then((response: AxiosResponse<Employee>) => {
        updateTable(response.data);
        this.setState({
          statusMessage,
          statusWindowOpen: true,
          statusType: 'success',
        });
      })
      .catch((error: AxiosError) => {
        this.setState({
          statusWindowOpen: true,
          statusMessage: SERVER_ERROR,
          statusType: 'error',
        });
        if (error.response) console.log(error.response.data);
      });
  }

  public render(): ReactNode {
    const { id, onCLose, open } = this.props;
    const { statusWindowOpen, statusMessage, statusType } = this.state;
    const title: string = id !== -1 ?
      'Редактировать сотрудника' :
      'Зарегистрировать сотрудника';
    return (
      <Dialog open={open} onClose={onCLose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <StatusWindow open={statusWindowOpen} onCLose={this.closeStatusModal} status={statusType}
                        message={statusMessage}/>
          <Grid container spacing={spacing}>
            <this.InputField xs={4} fieldName="last_name" required validationType="cyrillic"/>
            <this.InputField xs={4} fieldName="first_name" required validationType="cyrillic"/>
            <this.InputField xs={4} fieldName="middle_name" validationType="cyrillic"/>
          </Grid>
          <Grid container spacing={spacing}>
            <this.InputField xs={5} fieldName="email" required validationType="email"/>
            <this.InputField xs={4} fieldName="phone" validationType="phone"/>
            <this.SelectField xs={3} fieldName="sex" required/>
          </Grid>
          <Grid container spacing={spacing}>
            <this.DateField xs={5} fieldName="date_of_birth"/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <this.PrimaryButton
            text={id !== -1 ?
              'Сохранить' :
              'Создать'}
            icon={id !== -1 ?
              'save' :
              'add'}
            onClick={this.submitForm}/>
          {id !== -1 &&
          <this.SecondaryButton text="Удалить" icon="delete" onClick={this.deleteForm}/>}
          <this.SecondaryButton text="Отмена" icon="cancel"
                                onClick={onCLose}/>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditEmployee);
