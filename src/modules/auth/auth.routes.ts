import { Router } from "express";
import { signUp } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { signUpSchema } from "./auth.validation";

const router = Router();

router.post("/signup",validate(signUpSchema),signUp)

export default router;