import { Router } from "express";
import { signUp,login } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema, signUpSchema } from "./auth.validation";

const router = Router();

router.post("/signup",validate(signUpSchema),signUp)
router.post("/login",validate(loginSchema),login);

export default router;