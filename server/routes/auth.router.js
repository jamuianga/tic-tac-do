import { Router } from "express";
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.route('/')
  .post(AuthController.login)
  .get(AuthController.auhtorize);


router.post('/signup', AuthController.signup);



export default router;