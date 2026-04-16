import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUp from "./modules/auth/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/auth",signUp)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.................`);
});