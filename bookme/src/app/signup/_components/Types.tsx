export interface Employee {
  _id: string;
  employeeName: string;
  description: string;
  profileImage: string;
}

export interface DaySchedule {
  open: string;
  close: string;
  closed: boolean;
}

export interface WorkingHoursType {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface LunchBreak {
  start: string;
  end: string;
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
  workingHours: WorkingHoursType;
  lunchBreak?: LunchBreak;
  employees: Employee[];
  backGroundImage: string;
  aboutUsImage: string;
  experience: string;
  clientNumber: string;
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
  experience?: string;
  clientNumber?: string;
  employeeData?: Employee[];
  setEmployeeData?: (data: Employee[]) => void;
  setOpen?: (open: boolean) => void;
}

export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export const dayLabels: Record<keyof WorkingHoursType, string> = {
  monday: "Даваа",
  tuesday: "Мягмар",
  wednesday: "Лхагва",
  thursday: "Пүрэв",
  friday: "Баасан",
  saturday: "Бямба",
  sunday: "Ням",
};
