import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { createMessageSchema, updateMessageSchema } from "./message.validation";
import { createMessageController, deleteMessage, getAllMessages, getPublicMessage, getSingleMessage, updateMessage } from "./message.controller";
import { loginValidation } from "../../middleware/auth.middleware";



const router = Router();

router.post("/",loginValidation,validate(createMessageSchema),createMessageController)
router.get(
  "/:id",loginValidation,getSingleMessage
);
router.get("/",loginValidation,getAllMessages)

router.patch("/:id",loginValidation,validate(updateMessageSchema),updateMessage);

router.delete("/:id",loginValidation,deleteMessage);
router.get("/public/:shareId",getPublicMessage);
export default router;