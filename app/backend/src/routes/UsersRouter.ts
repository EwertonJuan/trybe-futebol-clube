import { Router } from 'express';
import UsersMiddlewares from '../middlewares/UsersMiddlewares';
import UsersController from '../controllers/UsersController';

const router = Router();

router.post('/', UsersMiddlewares.validateLogin, UsersController.login);

export default router;
