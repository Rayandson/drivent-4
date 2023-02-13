import { getBooking, postBooking, updateBooking } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { bookingSchema } from "@/schemas/booking-schemas";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(bookingSchema), postBooking)
  .put("/:bookingId", updateBooking);

export { bookingsRouter };
