import {Router} from 'express';
import {deleteAll, login, register} from '../controllers/auth';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/deleteAllUsers').get(deleteAll);

export default router;
