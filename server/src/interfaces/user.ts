export interface IUser {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}
