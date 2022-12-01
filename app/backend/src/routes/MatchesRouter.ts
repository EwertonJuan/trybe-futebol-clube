import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAll);
router.post('/', MatchesController.createMatch);
router.patch('/:id/finish', MatchesController.finishMatch);

export default router;
