import { Router } from 'express';
import UsersMiddlewares from '../middlewares/UsersMiddlewares';
import UsersController from '../controllers/UsersController';

const router = Router();

router.post('/', UsersMiddlewares.validateLogin, UsersController.login);
router.get('/validate', UsersController.validate);

export default router;
