import {z} from "zod" ;

export const createMeetingSchema = z.object({
  title: z.string().min(3, "Title too short")
});

