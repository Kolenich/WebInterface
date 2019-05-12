export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  phone: string | null;
  age: number;
  email: string;
  date_of_birth: Date;
  registration_date: Date;
  attachment: Attachment | null;
  organization: number | null;
  sex: 'male' | 'female';
}

export interface Attachment {
  file: string;
  file_name: string;
  file_mime: string;
  file_size: number;
}

export interface Organization {
  id?: number;
  full_name: string;
  short_name: string;
  registration_date: Date;
  inn: string;
  kpp: string;
  ogrn: string;
  okved_code: string;
  okved_name: string;
  employees: Employee[];
}

export type Table = 'employees' | 'organizations';
