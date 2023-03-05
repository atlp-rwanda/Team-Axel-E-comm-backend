/* eslint-disable no-shadow */

export interface UserAttributes {
  id: string;
  surname: string;
  given_name: string;
  email: string;
  password: string;

  role?: Role;
  status?: Status;

  avatar?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  street?: string;
  confirmationCode?: string;
  googleId?: string;
  resetToken?: string;
}

export enum Status {
  Pending = "Pending",
  Active = "Active",
  Inactive = "Inactive",
}

export enum Role {
  Admin = "Admin",
  Buyer = "Buyer",
  Seller = "Seller",
}
