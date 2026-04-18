import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { createMessageSchema } from "./message.validation";
import { createMessageController, getSingleMessage } from "./message.controller";
import { loginValidation } from "../../middleware/auth.middleware";



const router = Router();

router.post("/",loginValidation,validate(createMessageSchema),createMessageController)
router.get(
  "/:id",loginValidation,getSingleMessage
);


export default router;