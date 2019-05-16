import React, { ChangeEvent, ComponentState, PureComponent, ReactElement, ReactNode } from 'react';
import {
  WithStyles,
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
  Typography,
  Table,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { CustomButtonProps, Employee, Sex } from '../../../lib/types';
import { GridSize, GridSpacing } from '@material-ui/core/Grid';
import { employeeLabel } from '../../../lib/utils';
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers';
import * as MomentUtils from '@date-io/moment';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { Validation, validationMessages, validationMethods } from '../../../lib/validation';
import { Add, Cancel, CheckCircle, Delete, Done, Save, Update, Error } from '@material-ui/icons';
import api from '../../../lib/api';
import { AxiosError, AxiosResponse } from 'axios';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

interface Props extends WithStyles<typeof styles> {
  id: number;
  closeForm: () => ComponentState;
  updateTable: (newEmployee: Employee) => ComponentState;
}

interface State extends Employee {
  successWindow: boolean;
  errorWindow: boolean;
  statusMessage: Employee | string;
}

interface InputFieldProps {
  xs: GridSize;
  fieldName: keyof Employee;
  required?: boolean;
  validationType?: Validation;
}

// Переменная, отвечающая за расстояние между TextField'ми
const spacing: GridSpacing = 16;

// Сообщения статусов
const UPDATE_SUCCESS: string = 'Обновление прошло успешно!';
const SAVE_SUCCESS: string = 'Сохранение прошло успешно!';

class EditEmployee extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
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
      successWindow: false,
      errorWindow: false,
      statusMessage: '',
    };
  }

  public componentDidMount(): ComponentState {
    const { id } = this.props;
    api.getContent<Employee[]>('employees')
      .then(((response: AxiosResponse<Employee[]>) => {
        const employee: Employee | undefined = response.data.find(x => x.id === id);
        if (employee) this.setState({ ...employee });
      }))
      .catch();
  }

  InputField = (props: InputFieldProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    const employee = this.state;
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
    const employee = this.state;
    const value: string = employee[props.fieldName] !== null && employee[props.fieldName] ?
      String(employee[props.fieldName]) :
      String(new Date());
    return (
      <Grid item xs={props.xs}>
        <MuiPickersUtilsProvider utils={MomentUtils.default} locale={'ru'} moment={moment}>
          <InlineDatePicker
            className={classes.datePicker}
            margin="normal"
            variant="outlined"
            label={employeeLabel[props.fieldName]}
            value={value}
            onChange={this.handleDateChange(props.fieldName)}
            format="DD.MM.YYYY"
            keyboard
            disableFuture
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
    const { first_name, last_name, email, sex } = this.state;
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

  StatusModal = (): ReactElement<ReactNode> => {
    const { successWindow, errorWindow, statusMessage } = this.state;
    const { classes } = this.props;
    return (
      <Dialog open={successWindow || errorWindow} scroll="paper">
        <DialogTitle disableTypography>
          {successWindow &&
          <Typography variant="h5" className={classes.message}>
              <CheckCircle className={classNames(classes.statusIcon, classes.successIcon)}/>
              Успешно
          </Typography>}
          {errorWindow &&
          <Typography variant="h5" className={classes.message}>
              <Error className={classNames(classes.statusIcon, classes.errorIcon)}/>
              Ошибка
          </Typography>}
        </DialogTitle>
        <DialogContent>
          {typeof statusMessage !== 'string' && errorWindow &&
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Название поля</TableCell>
                      <TableCell>Текст ошибки</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(statusMessage).map((key: keyof Employee) => (
                  <TableRow key={key}>
                    <TableCell>{employeeLabel[key]}</TableCell>
                    <TableCell>{statusMessage[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>}
        </DialogContent>
        <DialogActions>
          <this.PrimaryButton
            text="Ок"
            onClick={this.closeStatusModal}
            icon="confirm"
          />
        </DialogActions>
      </Dialog>
    );
  }

  private closeStatusModal = (): ComponentState => {
    const { closeForm } = this.props;
    const { successWindow } = this.state;
    this.setState({ successWindow: false, errorWindow: false });
    if (successWindow) closeForm();
  }

  private handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): ComponentState => {
    const sex: Sex = event.target.value as Sex;
    this.setState({ sex });
  }

  private handleDateChange = (name: keyof State) => (moment: Moment): ComponentState => {
    const date: string = moment.format('YYYY-MM-DD');
    this.setState({ [name]: date });
  }

  private handleAttributeChange =
    (name: keyof State) => (event: ChangeEvent<HTMLInputElement>): ComponentState => {
      this.setState({ [name]: event.target.value });
    }

  private submitForm = (): ComponentState => {
    const { updateTable } = this.props;
    const employee = this.state;
    if (employee.id) {
      api.sendContent<Employee>('employees', employee, employee.id, 'patch')
        .then((response: AxiosResponse<Employee>) => {
          const newEmployee: Employee = response.data;
          updateTable(newEmployee);
          this.setState({ successWindow: true, statusMessage: UPDATE_SUCCESS });
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            this.setState({ errorWindow: true, statusMessage: error.response.data });
          }
        });
    } else {
      api.sendContent<Employee>('employees', employee)
        .then((response: AxiosResponse<Employee>) => {
          const newEmployee: Employee = response.data;
          updateTable(newEmployee);
          this.setState({ successWindow: true, statusMessage: SAVE_SUCCESS });
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            this.setState({ errorWindow: true, statusMessage: error.response.data });
          }
        });
    }
  }

  public render(): ReactNode {
    const { id, closeForm } = this.props;
    const title: string = id !== -1 ?
      'Редактировать сотрудника' :
      'Зарегистрировать сотрудника';
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <this.StatusModal/>
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
          <this.PrimaryButton text={id !== -1 ? 'Обновить' : 'Создать'}
                              icon={id !== -1 ? 'update' : 'add'}
                              onClick={this.submitForm}/>
          <this.SecondaryButton text="Отмена" icon="cancel"
                                onClick={closeForm}/>
        </DialogActions>
      </>
    );
  }
}

export default withStyles(styles)(EditEmployee);
