import { Router } from "express";
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.route('/')
  .post(AuthController.authenticate)
  .get(AuthController.authorize);


router.post('/resgister', AuthController.signup);



export default router;