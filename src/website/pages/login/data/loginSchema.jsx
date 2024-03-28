import { z } from "zod";

const Login_SCHEMA = {
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  password: z.string().min(3).max(12),
};

export default Login_SCHEMA;
