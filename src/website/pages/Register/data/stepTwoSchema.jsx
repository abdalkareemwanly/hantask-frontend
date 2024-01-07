import { z } from "zod";

const STEP_TWO_SCHEMA = {
  country: z.string().min(1),
  city: z.string().min(1),
  area: z.string().min(1),
};

export default STEP_TWO_SCHEMA;
