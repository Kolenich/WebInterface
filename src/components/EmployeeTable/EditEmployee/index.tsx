import React, { ChangeEvent, ComponentState, PureComponent, ReactElement, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Employee, Sex } from '../../../lib/types';
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

interface Props extends WithStyles<typeof styles> {
  employee: Employee;
}

interface State extends Employee {
  sexValid: boolean;
}

interface InputFieldProps {
  xs: GridSize;
  fieldName: keyof Employee;
  required?: boolean;
  validationType?: Validation;
}

// Переменная, отвечающая за расстояние между TextField'ми
const spacing: GridSpacing = 16;

class EditEmployee extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...newEmployee,
      sexValid: false,
    };
  }

  componentDidMount(): ComponentState {
    const { employee } = this.props;
    let sexValid: boolean = false;
    if (employee.sex !== '') sexValid = true;
    this.setState({ ...employee, sexValid });
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
          onChange={this.changeAttribute(props.fieldName)}
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

  private handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): ComponentState => {
    const sex: Sex = event.target.value as Sex;
    let sexValid: boolean = false;
    if (sex !== '') sexValid = true;
    this.setState({ sex, sexValid });
  }

  handleDateChange = (name: keyof Employee) => (date: Date): ComponentState => {
    this.setState({ [name]: date });
  }

  private changeAttribute =
    (name: keyof Employee) => (event: ChangeEvent<HTMLInputElement>): ComponentState => {
      this.setState({ [name]: event.target.value });
    }

  render(): ReactNode {
    const { employee } = this.props;
    const { sexValid } = this.state;
    console.log(sexValid);
    const title: string = employee.id !== -1 ?
                          'Редактировать сотрудника' :
                          'Зарегистрировать сотрудника';
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
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
          <Button variant="contained" color="primary">Сохранить</Button>
          <Button variant="contained" color="secondary">Отмена</Button>
        </DialogActions>
      </>
    );
  }
}

export default withStyles(styles)(EditEmployee);
