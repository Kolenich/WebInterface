export default {
  // Название колонок в таблице
  columns: [
    { name: 'id', title: 'ID' },
    { name: 'fullName', title: 'ФИО сотрудника' },
    { name: 'registrationDate', title: 'Дата регистрации' },
    { name: 'phone', title: 'Телефон' },
    { name: 'email', title: 'Электронная почта' },
    { name: 'dateOfBirth', title: 'Дата рождения' },
    { name: 'age', title: 'Возраст' },
    { name: 'sex', title: 'Пол' },
  ],
  defaultOrder: [
    'id',
    'fullName',
    'registrationDate',
    'phone',
    'email',
    'dateOfBirth',
    'age',
    'sex',
  ],
  defaultColumnWidths: [
    { columnName: 'id', width: window.innerWidth * 0.07 },
    { columnName: 'fullName', width: window.innerWidth * 0.23 },
    { columnName: 'registrationDate', width: window.innerWidth * 0.1 },
    { columnName: 'phone', width: window.innerWidth * 0.1 },
    { columnName: 'email', width: window.innerWidth * 0.2 },
    { columnName: 'dateOfBirth', width: window.innerWidth * 0.1 },
    { columnName: 'age', width: window.innerWidth * 0.1 },
    { columnName: 'sex', width: window.innerWidth * 0.1 },
  ],
};
