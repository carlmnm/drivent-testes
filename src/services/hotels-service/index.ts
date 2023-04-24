import { Hotel } from '@prisma/client';
import httpStatus from 'http-status';
import hotelsRepository from '@/repositories/hotels-repository';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  const hotels: Hotel[] = await hotelsRepository.getAllHotels();

  if (!enrollment || !ticket || !hotels) throw notFoundError();
  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote == true || ticket.TicketType.includesHotel !== true) {
    throw httpStatus.PAYMENT_REQUIRED;
  }
  return hotels;
}

const hotelsService = { getHotels };
export default hotelsService;
