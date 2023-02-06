export interface IUser {
    [key: number]: number;
    [key: symbol]: number;
    surName: string;
    givenName: string;
    email: string;
    password: string;
    province: string;
    district: string;
    sector: string;
    cell: string;
    street: string;
}

export interface IUpdateData {
    email: string;
    province: string;
    district: string;
    sector: string;
    cell: string;
    street: string;
}
