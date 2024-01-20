import { z } from "zod";

const DATE_STEP_SCHEMA = {
  deadlineDate: z.date(),
};

export default DATE_STEP_SCHEMA;
