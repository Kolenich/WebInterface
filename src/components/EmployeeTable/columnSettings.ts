export default {
  // Название колонок в таблице
  columns: [
    { name: 'id', title: 'ID' },
    { name: 'employee_fio', title: 'ФИО сотрудника' },
    { name: 'registration_date', title: 'Дата регистрации' },
    { name: 'phone', title: 'Телефон' },
    { name: 'email', title: 'Электронная почта' },
    { name: 'date_of_birth', title: 'Дата рождения' },
    { name: 'age', title: 'Возраст' },
    { name: 'sex', title: 'Пол' },
  ],
  defaultOrder: [
    'id',
    'employee_fio',
    'registration_date',
    'phone',
    'email',
    'date_of_birth',
    'age',
    'sex',
  ],
  defaultColumnWidths: [
    { columnName: 'id', width: window.innerWidth * 0.075 },
    { columnName: 'employee_fio', width: window.innerWidth * 0.225 },
    { columnName: 'registration_date', width: window.innerWidth * 0.1 },
    { columnName: 'phone', width: window.innerWidth * 0.1 },
    { columnName: 'email', width: window.innerWidth * 0.2 },
    { columnName: 'date_of_birth', width: window.innerWidth * 0.1 },
    { columnName: 'age', width: window.innerWidth * 0.1 },
    { columnName: 'sex', width: window.innerWidth * 0.09 },
  ],
  filteringStateColumnExtensions: [
    { columnName: 'employee_fio', filteringEnabled: false },
    { columnName: 'registration_date', filteringEnabled: false },
    { columnName: 'date_of_birth', filteringEnabled: false },
  ],
  sortingStateColumnExtensions: [
    { columnName: 'employee_fio', sortingEnabled: false },
    { columnName: 'sex', sortingEnabled: false },
  ],
  dateColumns: ['date_of_birth'],
  dateTimeColumns: ['registration_date'],
};
