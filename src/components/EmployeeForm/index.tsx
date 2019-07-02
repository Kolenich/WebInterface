import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  withStyles,
} from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';
import { Add, Cancel, Delete, Done, Save, Update } from '@material-ui/icons';
import {
  KeyboardDatePicker,
  MaterialUiPickersDate,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { AxiosError, AxiosResponse } from 'axios';
import ruLocale from 'date-fns/locale/ru';
import moment from 'moment';
import React, { ChangeEvent, Component, ComponentState, ReactNode } from 'react';
import api from '../../lib/api';
import {
  HTTPMethods,
  IAvatar,
  ICustomButtonProps,
  IEmployee,
  ISelectElement,
  Sex,
} from '../../lib/types';
import { employeeLabels, SERVER_RESPONSES } from '../../lib/utils';
import { validationMessages, validationMethods } from '../../lib/validation';
import FileUploader from '../FileUploader';
import StatusWindow from '../StatusWindow';
import { styles } from './styles';
import { IProps, ISelectFieldProps, IState, ITextFieldProps } from './types';

// Переменная, отвечающая за расстояние между TextField'ми
const spacing: GridSpacing = 2;

/**
 * Класс Формы для создания/редактирования Сотрудника
 */
class EmployeeForm extends Component<IProps, IState> {
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
        attachment: null,
        organization: null,
        date_of_birth: '',
        registration_date: '',
        avatar: null,
      },
      dateOfBirthNotNull: false,
      statusWindowOpen: false,
      statusMessage: '',
      statusType: 'loading',
    };
  }

  /**
   *  Объект ref для Select-элемента
   */
  private inputLabel = React.createRef<HTMLLabelElement>();

  /**
   * Метод, вызываемый после обнолвения компонента
   */
  public componentDidUpdate(prevProps: Readonly<IProps>): ComponentState {
    const { id } = this.props;
    if (prevProps.id !== id) {
      if (id !== -1) {
        api.getContent<IEmployee>(`employees/${id}`)
          .then(((response: AxiosResponse<IEmployee>) => {
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
            organization: null,
            date_of_birth: '',
            registration_date: '',
            avatar: null,
          },
          dateOfBirthNotNull: false,
          statusWindowOpen: false,
          statusMessage: '',
        });
      }
    }
  }

  /**
   * Кастомное поле ввода
   * @param xs - размер в Grid-сетке
   * @param fieldName - имя поля в объекте Employee
   * @param validationType - тип валидации для поля
   * @param props - остальные пропсы
   * @constructor
   */
  InputField = ({ xs, fieldName, validationType, ...props }: ITextFieldProps): JSX.Element => {
    const { classes } = this.props;
    const { employee } = { ...this.state };
    const value: string = employee[fieldName] !== null && employee[fieldName] ?
      String(employee[fieldName]) :
      '';
    let valid: boolean = true;
    let helperText: string = '';
    if (validationType && value !== '') {
      if (value) {
        valid = validationMethods[validationType](value);
      }
      if (!valid) {
        helperText = validationMessages[validationType];
      }
    }
    return (
      <Grid item xs={xs}>
        <TextField
          label={employeeLabels[fieldName]}
          placeholder={employeeLabels[fieldName]}
          className={classes.textField}
          name={String(fieldName)}
          error={!valid}
          helperText={helperText}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChange}
          value={value}
          {...props}
        />
      </Grid>
    );
  }

  /**
   * Кастомное поле выбора даты
   * @param xs - размер в Grid-сетке
   * @param fieldName - имя поля в объекте Employee
   * @param props - остальные пропсы
   * @constructor
   */
  DateField = ({ xs, fieldName, ...props }: ITextFieldProps): JSX.Element => {
    const { classes } = this.props;
    const { employee } = { ...this.state };
    const value: string | null = employee[fieldName] !== null && employee[fieldName] ?
      String(employee[fieldName]) :
      null;
    return (
      <Grid item xs={xs}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            {...props}
            autoOk
            openTo="year"
            views={['year', 'month', 'date']}
            className={classes.datePicker}
            margin="normal"
            variant="inline"
            inputVariant="outlined"
            label={employeeLabels[fieldName]}
            value={value}
            onChange={this.handleDateChange(fieldName)}
            format="dd.MM.yyyy"
            disableFuture
            invalidDateMessage="Дата должна быть в формате ДД.ММ.ГГГГ"
            minDateMessage="Дата не должна быть меньше 01.01.1900"
            maxDateMessage="Дата не должна превышать сегодняшнее число"
          />
        </MuiPickersUtilsProvider>
      </Grid>
    );
  }

  /**
   * Кастомное селектор
   * @param xs - размер в Grid-сетке
   * @param fieldName - имя поля в объекте Employee
   * @param labelWidth - ширина лэйбла
   * @param props - остальные пропсы
   * @constructor
   */
  SelectField = ({ xs, fieldName, labelWidth, ...props }: ISelectFieldProps): JSX.Element => {
    const { classes } = this.props;
    const { employee } = { ...this.state };
    const value: string = employee[fieldName] !== null && employee[fieldName] ?
      String(employee[fieldName]) :
      '';
    return (
      <Grid item xs={xs}>
        <FormControl variant="outlined" className={classes.formControl} {...props}>
          <InputLabel ref={this.inputLabel} htmlFor="sex">Пол</InputLabel>
          <Select
            value={value}
            onChange={this.handleSelectChange}
            input={<OutlinedInput labelWidth={labelWidth} id="sex" />}>
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }

  /**
   * Кастомная кнопка (основная)
   * @param text - текст кнопки
   * @param icon - иконка кнопки
   * @param props
   * @constructor
   */
  PrimaryButton = ({ text, icon, ...props }: ICustomButtonProps): JSX.Element => {
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
        {...props}
      >
        {text}
        {icon === 'save' &&
        <Save className={classes.rightIcon} />}
        {icon === 'add' &&
        <Add className={classes.rightIcon} />}
        {icon === 'confirm' &&
        <Done className={classes.rightIcon} />}
        {icon === 'update' &&
        <Update className={classes.rightIcon} />}
      </Button>
    );
  }

  /**
   * Кастомная кнопка (дополнительная)
   * @param text - текст кнопки
   * @param icon - иконка кнопки
   * @param props
   * @constructor
   */
  SecondaryButton = ({ text, icon, ...props }: ICustomButtonProps): JSX.Element => {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        {...props}
      >
        {text}
        {icon === 'delete' &&
        <Delete className={classes.rightIcon} />}
        {icon === 'cancel' &&
        <Cancel className={classes.rightIcon} />}
      </Button>
    );
  }

  /**
   * Функция-колбэк, закрывающая окно статуса
   */
  private closeStatusModal = (): ComponentState => {
    const { onClose } = this.props;
    const { statusType } = this.state;
    this.setState({
      statusWindowOpen: false,

    });
    if (statusType === 'success') {
      this.setState({
        employee: {
          first_name: '',
          last_name: '',
          email: '',
          sex: '',
          middle_name: null,
          phone: null,
          attachment: null,
          organization: null,
          date_of_birth: '',
          registration_date: '',
          avatar: null,
        },
      });
      onClose();
    }
  }

  /**
   * Функция, обрабатывающая изменения в селекторе
   * @param event - ивент изменения
   */
  private handleSelectChange = (event: ChangeEvent<ISelectElement>): ComponentState => {
    const sex: Sex = event.target.value as Sex;
    const { employee } = this.state;
    this.setState({ employee: { ...employee, sex } });
  }

  /**
   * Функция, обрабатывающая изменения в компоненте выбора даты
   * @param name - имя поля для изменения
   */
  private handleDateChange = (name: keyof IEmployee) => (date: MaterialUiPickersDate):
    ComponentState => {
    const { employee } = this.state;
    this.setState({
      employee: {
        ...employee,
        [name]: date,
      },
      dateOfBirthNotNull: date !== null,
    });
  }

  /**
   * Функция, обрабатывающая изменения в поле ввода
   * @param event - ивент изменения
   */
  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): ComponentState => {
    const { employee } = { ...this.state };
    const name = event.target.name as keyof IEmployee;
    const value = event.target.value;
    this.setState({ employee: { ...employee, [name]: value } });
  }

  /**
   * Функция, посылающая запрос на сервер для удаления записи из БД
   */
  private deleteForm = (): ComponentState => {
    this.setState({ statusWindowOpen: true, statusType: 'loading' });
    const { employee } = this.state;
    const { updateTable } = this.props;
    const url: string = `employees/${employee.id}`;
    const method: HTTPMethods = 'delete';
    api.sendContent<IEmployee>(url, employee, method)
      .then((response: AxiosResponse<IEmployee>) => {
        updateTable();
        this.setState({
          statusWindowOpen: true,
          statusMessage: SERVER_RESPONSES[response.status],
          statusType: 'success',
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        if (error.response) {
          this.setState({
            statusWindowOpen: true,
            statusMessage: SERVER_RESPONSES[error.response.status],
            statusType: 'error',
          });
        }
      });
  }

  /**
   * Функция, отправляющая запрос на сервер для создания или обновления записи в БД
   */
  private submitForm = (): ComponentState => {
    this.setState({ statusWindowOpen: true, statusType: 'loading' });
    const { updateTable } = this.props;
    const { employee } = { ...this.state };
    // eslint-disable-next-line
    Object.keys(employee).map((field: keyof IEmployee): void => {
      if (employee[field] === '') {
        employee[field] = null;
      }
    });
    employee.date_of_birth = moment(employee.date_of_birth).format('YYYY-MM-DD');
    let url: string = 'employees';
    let method: HTTPMethods = 'post';
    if (employee.id) {
      url = `employees/${employee.id}`;
      method = 'patch';
    }
    api.sendContent<IEmployee>(url, employee, method)
      .then((response: AxiosResponse<IEmployee>) => {
        updateTable();
        this.setState({
          statusMessage: SERVER_RESPONSES[response.status],
          statusWindowOpen: true,
          statusType: 'success',
        });
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          this.setState({
            statusWindowOpen: true,
            statusMessage: SERVER_RESPONSES[error.response.status],
            statusType: 'error',
          });
        }
      });
  }

  /**
   * Функция-колбэк, для загрузки файла
   * @param avatar объект с файлом
   */
  fileUploadCallback = (avatar: IAvatar) => {
    const { employee } = this.state;
    this.setState({ employee: { ...employee, avatar } });
  }

  /**
   * Функция-колбэк, вызываемая при удалении файла
   */
  fileRemoveCallback = () => {
    const { employee } = this.state;
    this.setState({ employee: { ...employee, avatar: null } });
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { id, onClose, open, classes } = this.props;
    const { statusWindowOpen, statusMessage, statusType, employee } = this.state;
    const title: string = id !== -1 ?
      'Редактировать сотрудника' :
      'Зарегистрировать сотрудника';
    let avatarUrl: string | null = null;
    if (employee.avatar !== null) {
      avatarUrl = employee.avatar.file;
    }
    let labelWidth: number = 0;
    if (this.inputLabel.current !== null) {
      labelWidth = this.inputLabel.current.offsetWidth;
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
          <StatusWindow open={statusWindowOpen} onClose={this.closeStatusModal} status={statusType}
                        message={statusMessage} />
          <Grid container spacing={spacing}>
            <this.InputField xs={4} fieldName="last_name" required validationType="cyrillic" />
            <this.InputField xs={4} fieldName="first_name" required validationType="cyrillic" />
            <this.InputField xs={4} fieldName="middle_name" validationType="cyrillic" />
          </Grid>
          <Grid container spacing={spacing}>
            <this.InputField xs={5} fieldName="email" required validationType="email" />
            <this.InputField xs={4} fieldName="phone" validationType="phone" />
            <this.SelectField labelWidth={labelWidth} xs={3} fieldName="sex" required />
          </Grid>
          <Grid container spacing={spacing}>
            <this.DateField xs={5} fieldName="date_of_birth" />
          </Grid>
          <Grid container spacing={spacing}>
            <FileUploader
              xs={12}
              url={avatarUrl}
              fileUploadCallback={this.fileUploadCallback}
              fileRemoveCallback={this.fileRemoveCallback}
            />
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
            onClick={this.submitForm} />
          {id !== -1 &&
          <this.SecondaryButton text="Удалить" icon="delete" onClick={this.deleteForm} />}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EmployeeForm);
