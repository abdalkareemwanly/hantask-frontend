import { z } from "zod";
const COUPONE_SCHEMA = {
  code: z.string().min(6).max(6),
};

export default COUPONE_SCHEMA;
