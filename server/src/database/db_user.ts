import {Knex} from 'knex';
import db from './db_connection';
import {DBS} from "./db_interfaces";
import { IUser } from "../interfaces";

export async function updateUserFields(user_id: number, {firstname, lastname, address, email, password}: IUser): Promise<Knex.QueryBuilder>{
    return db(DBS.User)
        .update({
            ...{firstname},
            ...{lastname},
            ...{address},
            ...{email},
            ...{password},
        })
        .where({ user_id, active: true });
}

export async function createNewUser({firstname,lastname, address, email, password}: IUser): Promise<Knex.QueryBuilder>{
    return db(DBS.User)
        .returning(['user_id'])
        .insert([
            {
                email,
                password,
                firstname,
                lastname,
                address,
            } as IUser
        ]);
}

export async function getUserById(user_id: number, onlyActiveUsers: boolean = true): Promise<Knex.QueryBuilder>{
    return db(DBS.User)
        .where({
            user_id,
            ...(onlyActiveUsers && {active: true})
        });
}

export async function delUserById(user_id: number): Promise<Knex.QueryBuilder>{
    return db(DBS.User)
        .update({ active: false })
        .where({ user_id, active: true });
}
