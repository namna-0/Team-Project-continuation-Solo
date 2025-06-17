export interface Employee {
  _id: string;
  employeeName: string;
  description: string;
  profileImage: string;
}

interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

export interface Company {
  _id: string;
  companyName: string;
  description: string;
  address: string;
  city: string;
  phoneNumber: string;
  email: string;
  companyLogo: string;
  companyImages: string[];
  workingHours: WorkingHours;
  employees: Employee[];
}

const dayLabels: Record<string, string> = {
  monday: "Даваа",
  tuesday: "Мягмар",
  wednesday: "Лхагва",
  thursday: "Пүрэв",
  friday: "Баасан",
  saturday: "Бямба",
  sunday: "Ням",
};
export interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
  city: string;
  phone: string;
  website: string;
  logo: string;
  openingHours: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };
  lunchBreak: {
    start: string;
    end: string;
  };
}

interface DaySchedule {
  open: string;
  close: string;
  closed: boolean;
}
