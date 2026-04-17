import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { createMessageSchema } from "./message.validation";
import { createMessageController } from "./message.controller";
import { loginValidation } from "../../middleware/auth.middleware";



const router = Router();

router.post("/",loginValidation,validate(createMessageSchema),createMessageController)


export default router;