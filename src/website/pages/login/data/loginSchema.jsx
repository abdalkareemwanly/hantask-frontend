import { z } from "zod";

const Login_SCHEMA = {
  username: z.string().min(3).max(50),
  password: z.string().min(3).max(12),
  rememberme: z.boolean(),
};

export default Login_SCHEMA;
