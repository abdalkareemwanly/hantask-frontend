import { z } from "zod";

const FORGOT_PASSWORD_SCHEMA = {
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
};

export default FORGOT_PASSWORD_SCHEMA;
