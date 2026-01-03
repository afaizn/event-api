import z from "zod";

export const createEventValidation = z.object({
  name: z.string().min(1, "Name is required"),
  dateTime: z.string().min(1, "Date and Time is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
});
