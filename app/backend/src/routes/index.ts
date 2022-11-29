import { Router } from 'express';
import usersRouter from './UsersRouter';
import teamsRouter from './TeamsRouter';

const router = Router();

router.use('/login', usersRouter);

router.use('/teams', teamsRouter);

export default router;
