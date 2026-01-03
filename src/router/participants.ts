import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createParticipantValidation } from "../validation/participant-validation.js";

export const participantsRoute = new Hono()

  .get("/", (c) => {
    return c.json({ events: [] });
  })

  .get("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ eventId: id });
  })

  .post("/", zValidator("json", createParticipantValidation), async (c) => {
    const body = await c.req.valid("json");
    const newParticipant = await prisma.participant.create({
      data: {
        name: body.name,
        email: body.email,
        eventId: body.eventId,
      },
    });
    return c.json({ participant: newParticipant });
  })

  .patch("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Event ${id} updated` });
  })

  .delete("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Event ${id} deleted` });
  });
