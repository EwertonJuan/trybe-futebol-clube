import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();

router.post('/', UsersController.login);

export default router;
