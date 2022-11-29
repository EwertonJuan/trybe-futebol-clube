import { Router } from 'express';
import usersRouter from './UsersRouter';
import teamsRouter from './TeamsRouter';
import matchesRouter from './MatchesRouter';

const router = Router();

router.use('/login', usersRouter);

router.use('/teams', teamsRouter);

router.use('/matches', matchesRouter);

export default router;
