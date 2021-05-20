import logger from "../utils/logger";
import { User } from "../db-abstract-layer/user";
import {IUser} from "../interfaces";

export async function createNewUser(userData: IUser): Promise<any> {
    logger.silly('createNewUser: ' + JSON.stringify(userData, null, 4));
    const userQuery = User.createNewUser(userData);
    const userQueryStr = userQuery.toString();
    const [ user ] = await userQuery
        .catch(error => {
            logger.error(error);
            return [ null ];
        });

    logger.silly(`Query: ${userQueryStr}\nResult: ${JSON.stringify(user)}`);
    return user;
}

export async function updateUserFields(userId: number, userData: IUser): Promise<boolean> {
    const userQuery = User.updateUserFields(userId, userData);
    const userQueryStr = userQuery.toString();
    const isUpdated: boolean = await userQuery
        .then(() => true)
        .catch(error => {
            logger.error(error);
            return false;
        });

    logger.silly(`Query: ${userQueryStr}\nResult: ${isUpdated}`);
    return isUpdated;
}

export async function getUserById(userId: number): Promise<IUser> {
    const userQuery = User.getUserById(userId);
    const userQueryStr = userQuery.toString();
    const user: IUser = await userQuery
        .catch(error => {
            logger.error(error);
            return null;
        });

    logger.silly(`Query: ${userQueryStr}\nResult: ${JSON.stringify(user)}`);
    return user;
}

export async function delUserById(userId: number): Promise<boolean> {
    const userQuery = User.delUserById(userId);
    const userQueryStr = userQuery.toString();
    const isDeleted = await userQuery
        .then(() => true)
        .catch(error => {
            logger.error(error);
            return false;
        });

    logger.silly(`Query: ${userQueryStr}\nResult: ${isDeleted}`);
    return isDeleted;
}
