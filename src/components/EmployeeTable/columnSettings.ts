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
    { columnName: 'id', width: 120 },
    { columnName: 'fullName', width: 270 },
    { columnName: 'registrationDate', width: 170 },
    { columnName: 'phone', width: 170 },
    { columnName: 'email', width: 270 },
    { columnName: 'dateOfBirth', width: 170 },
    { columnName: 'age', width: 120 },
    { columnName: 'sex', width: 120 },
  ],
};
