import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUp from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import login from "./modules/auth/auth.routes";
import { loginValidation } from "./middleware/auth.middleware";
import messageRoutes from "./modules/message/message.routes";
import helmet from "helmet";
import morgan from "morgan";
import { authLimiter, globalLimiter } from "./middleware/security.middleware";
import { startUnlockJob } from "./job/unlock.job";


dotenv.config();

const app = express();

app.use(helmet())

app.use(cors());
app.use(express.json());

app.use(morgan("dev"))

const PORT = process.env.PORT || 5000;

app.get("/",loginValidation, (req, res) => {
  res.send("Server is running 🚀");
});
app.use(globalLimiter)
app.use("/api/auth",authLimiter,signUp)
app.use("/api/auth",authLimiter,login)
app.use("/api/message",messageRoutes)

app.use(globalErrorHandler)
// startUnlockJob()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.................`);
});