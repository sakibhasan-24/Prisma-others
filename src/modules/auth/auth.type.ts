



// export type SignupInput = {
//   name: string;
//   email: string;
//   password: string;
// };
import { z } from "zod";
import { signUpSchema } from "./auth.validation";

export type SignupInput = z.infer<typeof signUpSchema>;


export type LoginInput = {
  email: string;
  password: string;
};