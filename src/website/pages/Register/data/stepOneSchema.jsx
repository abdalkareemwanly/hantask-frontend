import { z } from "zod";

const STEP_ONE_SCHEMA = {
  fullname: z.string().min(3).max(50),
  username: z.string().min(3).max(50),
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  phone: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g),
  password: z.string().min(3).max(50),
  repeatPassword: z.string().min(3).max(50),
};

export default STEP_ONE_SCHEMA;
