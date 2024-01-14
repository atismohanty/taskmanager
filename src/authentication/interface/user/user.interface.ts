export interface IUser {
    firstName?: string;
    lastName?: string;
    userName: string;
    password: string;
    isActive: boolean
}



export interface IUserResponse {
    firstName?: string;
    lastName?: string;
    userName: string;
}


export interface IUserLoginRequest {
    userName: string;
    password: string;
    reqNo: number
}
export interface IUserLoginResponse {
    userName: string;
}
