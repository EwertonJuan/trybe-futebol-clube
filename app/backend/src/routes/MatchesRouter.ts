import { Router } from 'express';
import MatchesMiddlewares from '../middlewares/MatchesMiddlewares';
import MatchesController from '../controllers/MatchesController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', MatchesController.getAll);
router.post(
  '/',
  AuthMiddleware.validateToken,
  MatchesMiddlewares.validateMatch,
  MatchesController.createMatch,
);
router.patch('/:id/finish', MatchesController.finishMatch);

export default router;
