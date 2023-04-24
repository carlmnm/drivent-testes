import { Hotel } from '@prisma/client';
import httpStatus from 'http-status';
import hotelsRepository from '@/repositories/hotels-repository';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const hotels: Hotel[] = await hotelsRepository.getAllHotels();
  if (!hotels) throw notFoundError();

  if (ticket.status !== 'PAID') throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.isRemote === true) throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.includesHotel !== true) throw httpStatus.PAYMENT_REQUIRED;

  return hotels;
}

const hotelsService = { getHotels };
export default hotelsService;
