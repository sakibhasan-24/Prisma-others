import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUp from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import login from "./modules/auth/auth.routes";
import { loginValidation } from "./middleware/auth.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/",loginValidation, (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/auth",signUp)
app.use("/api/auth",login)


app.use(globalErrorHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.................`);
});