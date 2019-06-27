export default {
  // Название колонок в таблице
  columns: [
    { name: 'id', title: 'ID' },
    { name: 'full_name', title: 'ФИО сотрудника' },
    { name: 'registration_date', title: 'Дата регистрации' },
    { name: 'phone', title: 'Телефон' },
    { name: 'email', title: 'Электронная почта' },
    { name: 'date_of_birth', title: 'Дата рождения' },
    { name: 'age', title: 'Возраст' },
    { name: 'sex', title: 'Пол' },
  ],
  defaultOrder: [
    'id',
    'full_name',
    'registration_date',
    'phone',
    'email',
    'date_of_birth',
    'age',
    'sex',
  ],
  defaultColumnWidths: [
    { columnName: 'id', width: window.innerWidth * 0.075 },
    { columnName: 'full_name', width: window.innerWidth * 0.225 },
    { columnName: 'registration_date', width: window.innerWidth * 0.1 },
    { columnName: 'phone', width: window.innerWidth * 0.1 },
    { columnName: 'email', width: window.innerWidth * 0.2 },
    { columnName: 'date_of_birth', width: window.innerWidth * 0.1 },
    { columnName: 'age', width: window.innerWidth * 0.1 },
    { columnName: 'sex', width: window.innerWidth * 0.09 },
  ],
  filteringStateColumnExtensions: [
    { columnName: 'registration_date', filteringEnabled: false },
    { columnName: 'date_of_birth', filteringEnabled: false },
  ],
  sortingStateColumnExtensions: [
  ],
  dateColumns: ['date_of_birth'],
  dateTimeColumns: ['registration_date'],
};
