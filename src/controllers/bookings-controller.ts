import { AuthenticatedRequest } from "@/middlewares";
import bookingsService from "@/services/bookings-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingsService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch(err) {
    if(err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const { userId } = req;

  try {
    const booking = await bookingsService.postBooking(userId, roomId);

    res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch(err) {
    if(err.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(err.name === "ForbiddenError") {
      res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const bookingId = Number(req.params.bookingId);
  const { roomId } = req.body;
  const { userId } = req;

  try {
    const booking = await bookingsService.updateBooking(userId, bookingId, roomId);

    res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch(err) {
    if(err.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(err.name === "ForbiddenError") {
      res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
} 
