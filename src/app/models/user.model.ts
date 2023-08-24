export interface TUser {
    id: string,
    name: string,
    balance: number,
    email: string,
    registerAt: Date | string,
    active: boolean
}

export interface TUserResponse extends TUser {
    checked: boolean;
}
