declare namespace Express {
  export interface Request {
    userId?: string;
    isAdmin?: boolean;
    companyId?: string;
  }
}
