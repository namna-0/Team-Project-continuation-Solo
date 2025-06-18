export interface WorkingHoursType {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  open: string;
  close: string;
  closed: boolean;
}

export interface Employee {
  _id: string;
  employeeName: string;
  description: string;
  profileImage: string;
  availability?: boolean;
  duration?: string;
  startTime?: string;
  endTime?: string;
  lunchTimeStart?: string;
  lunchTimeEnd?: string;
}

export type Company = {
  _id?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  companyName: string;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
  city: string;
  phoneNumber: string;
  companyLogo: string;
  companyImages: string[];
  employees?: Employee[];
  workingHours: WorkingHoursType;
  lunchBreak?: {
    start: string;
    end: string;
  };
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
  openingHours: WorkingHoursType;
  lunchBreak: {
    start: string;
    end: string;
  };
}

export const dayLabels: { [key: string]: string } = {
  monday: "Даваа",
  tuesday: "Мягмар",
  wednesday: "Лхагва",
  thursday: "Пүрэв",
  friday: "Баасан",
  saturday: "Бямба",
  sunday: "Ням",
};
