import { Router } from 'express';
import usersRouter from './UsersRouter';

const router = Router();

router.use('/login', usersRouter);

export default router;
