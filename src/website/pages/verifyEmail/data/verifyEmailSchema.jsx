import { z } from "zod";

const VERIFY_SCHEMA = {
  code: z.string().min(6).max(6),
};

export default VERIFY_SCHEMA;
