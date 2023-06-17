import express from 'express'
import { forgotController, loginController, registerController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
//router object

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController);
router.post('/forgot-password',forgotController)
router.get('/test', requireSignin, isAdmin, testController);


// protected route 
router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({
        ok: true
    });
})
export default router;