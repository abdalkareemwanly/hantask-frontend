import { z } from "zod";

const CONFIRMATION_STEP_SCHEMA = {
  expectedSalary: z.string().min(1),
  agree: z.boolean(),
};

export default CONFIRMATION_STEP_SCHEMA;
