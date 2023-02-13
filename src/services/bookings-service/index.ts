import { forbiddenError, notFoundError } from "@/errors";
import bookingsRepository from "@/repositories/bookings-repository";
import hotelRepository from "@/repositories/hotel-repository";

async function getBooking(userId: number) {
  const booking = await bookingsRepository.findBooking(userId);

  if(!booking) {
    throw notFoundError();
  }

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const bookingsAmmount = await bookingsRepository.countRoomBookings(roomId);
  const room = await hotelRepository.findRoom(roomId);

  if(!room) {
    throw notFoundError();
  }

  if(room.capacity === bookingsAmmount) {
    throw forbiddenError();
  }

  const booking = await bookingsRepository.createBooking(userId, roomId);

  return booking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const userBooking = await bookingsRepository.findBooking(userId);

  if(!userBooking || userBooking.id !== bookingId) {
    throw forbiddenError();
  }

  const bookingsAmmount = await bookingsRepository.countRoomBookings(roomId);
  const room = await hotelRepository.findRoom(roomId);

  if(!room) {
    throw notFoundError();
  }

  if(room.capacity === bookingsAmmount) {
    throw forbiddenError();
  }
  
  const booking = await bookingsRepository.updateBooking(bookingId, roomId);

  return booking;
}

const bookingsService = {
  getBooking,
  postBooking,
  updateBooking
};

export default bookingsService;
