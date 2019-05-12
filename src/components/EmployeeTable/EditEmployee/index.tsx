import React, { ChangeEvent, ComponentState, PureComponent, ReactElement, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { CustomButtonProps, Employee, Sex } from '../../../lib/types';
import { newEmployee } from '../index';
import Grid, { GridSize, GridSpacing } from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { employeeLabel } from '../../../lib/utils';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import * as MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/ru';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Validation, validationMessages, validationMethods } from '../../../lib/validation';
import { Add, Cancel, CheckCircle, Delete, Done, Save, Update } from '@material-ui/icons';
import api from '../../../lib/api';
import { AxiosError, AxiosResponse } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

interface Props extends WithStyles<typeof styles> {
  employee: Employee;
  closeForm: () => ComponentState;
  updateTable: (newEmployee: Employee) => ComponentState;
}

interface State extends Employee {
  successWindowOpen: boolean;
  statusMessage: string;
}

interface InputFieldProps {
  xs: GridSize;
  fieldName: keyof Employee;
  required?: boolean;
  validationType?: Validation;
}

// Переменная, отвечающая за расстояние между TextField'ми
const spacing: GridSpacing = 16;

// Список ключей для удаления из объекта при создании записи
const redundantKeys: string[] = [
  'id',
  'age',
  'attachment',
  'registration_date',
  'organization',
  'successWindowOpen',
  'statusMessage',
];

// Сообщения статусов
const NOT_FOUND: string = 'Совпадений не найдено';
const SERVER_ERROR: string = 'Ошибка на сервере, попробуйте позже';
const NO_ORG_DATA: string = 'Заполните данные об организации';
const UPDATE_SUCCESS: string = 'Обновление прошло успешно!';
const SAVE_SUCCESS: string = 'Сохранение прошло успешно!';

class EditEmployee extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...newEmployee,
      successWindowOpen: false,
      statusMessage: '',
    };
  }

  public componentDidMount(): ComponentState {
    const { employee } = this.props;
    this.setState({ ...employee });
  }

  InputField = (props: InputFieldProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const employee: Employee = this.state;
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
    const employee: Employee = this.state;
    const value: string = employee[props.fieldName] !== null && employee[props.fieldName] ?
      String(employee[props.fieldName]) :
      '';
    return (
      <Grid item xs={props.xs}>
        <MuiPickersUtilsProvider utils={MomentUtils.default} locale={'ru'} moment={moment}>
          <DatePicker
            className={classes.datePicker}
            margin="normal"
            variant="outlined"
            label={employeeLabel[props.fieldName]}
            value={value}
            onChange={this.handleDateChange(props.fieldName)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    );
  }

  SelectField = (props: InputFieldProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const employee = this.state;
    const value: string = employee[props.fieldName] !== null && employee[props.fieldName] ?
      String(employee[props.fieldName]) :
      '';
    return (
      <Grid item xs={props.xs}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="sex">Пол</InputLabel>
          <Select
            value={value}
            onChange={this.handleSelectChange}
            input={<OutlinedInput labelWidth={30}/>}>
            <MenuItem value="">
              <em>Укажите пол...</em>
            </MenuItem>
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }

  PrimaryButton = (buttonProps: CustomButtonProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const { last_name, first_name, email, sex } = this.state;
    const disabled: boolean =
      validationMethods.cyrillic(first_name) &&
      validationMethods.cyrillic(last_name) &&
      validationMethods.email(email) &&
      sex !== '';
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

  SuccessModal = (): ReactElement<ReactNode> => {
    const { successWindowOpen, statusMessage } = this.state;
    const { classes, closeForm } = this.props;
    return (
      <Dialog open={successWindowOpen} scroll="body">
        <DialogTitle disableTypography>
          <Typography variant="h5" className={classes.message}>
            <CheckCircle className={classNames(classes.statusIcon, classes.successIcon)}/>
            Успешно
          </Typography>
        </DialogTitle>
        <DialogContent>
          {statusMessage}
        </DialogContent>
        <DialogActions>
          <this.PrimaryButton
            text="Ок"
            onClick={() => {
              this.setState({ successWindowOpen: false });
              closeForm();
            }}
            icon="confirm"
          />
        </DialogActions>
      </Dialog>
    );
  }

  private handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): ComponentState => {
    const sex: Sex = event.target.value as Sex;
    this.setState({ sex });
  }

  private handleDateChange = (name: keyof Employee) => (date: Date): ComponentState => {
    this.setState({ [name]: date });
  }

  private handleAttributeChange =
    (name: keyof Employee) => (event: ChangeEvent<HTMLInputElement>): ComponentState => {
      this.setState({ [name]: event.target.value });
    }

  private getFormattedDate = (date: Date | string): string => {
    const year: string = String(new Date(date).getFullYear());
    let month: string = (1 + new Date(date).getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;
    let day = new Date(date).getDate().toString();
    day = day.length > 1 ? day : `0${day}`;
    return `${year}-${month}-${day}`;
  }

  private submitForm = (employee: Employee) => (): ComponentState => {
    const { updateTable } = this.props;
    if (employee.id !== -1) {

    } else {
      redundantKeys.forEach(key => delete employee[key]);
      employee.date_of_birth = this.getFormattedDate(employee.date_of_birth);
      let id: number = 0;
      if (employee.id) id = employee.id;
      api.sendContent<Employee>('employees', employee, id)
        .then((response: AxiosResponse<Employee>) => {
          this.setState({ successWindowOpen: true, statusMessage: SAVE_SUCCESS });
          const newEmployee: Employee = response.data;
          updateTable(newEmployee);
        })
        .catch((error: AxiosError) => {
          if (error.response) console.log(error.response);
        });
    }
  }

  public render(): ReactNode {
    const { employee } = this.props;
    const form = this.state;
    const title: string = employee.id !== -1 ?
      'Редактировать сотрудника' :
      'Зарегистрировать сотрудника';
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <this.SuccessModal/>
          <Grid container spacing={spacing}>
            <this.InputField xs={4} fieldName="last_name" required validationType="cyrillic"/>
            <this.InputField xs={4} fieldName="first_name" required validationType="cyrillic"/>
            <this.InputField xs={4} fieldName="middle_name" validationType="cyrillic"/>
          </Grid>
          <Grid container spacing={spacing}>
            <this.InputField xs={5} fieldName="email" required validationType="email"/>
            <this.InputField xs={4} fieldName="phone" validationType="phone"/>
            <this.SelectField xs={3} fieldName="sex"/>
          </Grid>
          <Grid container spacing={spacing}>
            <this.DateField xs={4} fieldName="date_of_birth"/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <this.PrimaryButton text={employee.id !== -1 ? 'Обновить' : 'Создать'}
                              icon={employee.id !== -1 ? 'update' : 'add'}
                              onClick={this.submitForm(form)}/>
          <this.SecondaryButton text="Отмена" icon="cancel"/>
        </DialogActions>
      </>
    );
  }
}

export default withStyles(styles)(EditEmployee);
