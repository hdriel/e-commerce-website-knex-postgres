import express from 'express';
import { getUserById, delUserById, createNewUser, updateUserFields } from '../controller/user';
import {IUser} from "../interfaces";

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await getUserById(+userId);
    return res.json(user);
});

router.post('/', async (req, res) => {
    const user = await createNewUser(req.body);
    return res.json(user);
});

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { address } = req.body; // update only address field as requirement!
    const isUpdated = await updateUserFields(+userId, { address } as IUser);
    return res.sendStatus(isUpdated ? 200 : 403);
});

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    const idDeleted = await delUserById(+userId);
    return res.sendStatus(idDeleted ? 200 : 403);
});

export default router;
