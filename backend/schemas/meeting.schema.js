import {z} from "zod" ;

export const createMeetingSchema = z.object({
  title: z.string().min(3, "Title too short").max(100),
  transcript: z.string().min(10, "Transcript too short").max(20000)
});

