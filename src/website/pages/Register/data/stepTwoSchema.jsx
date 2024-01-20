import { z } from "zod";

const STEP_TWO_SCHEMA = {
  country: z.number().min(1),
  city: z.number().min(1),
  area: z.number().min(1),
};

export default STEP_TWO_SCHEMA;
