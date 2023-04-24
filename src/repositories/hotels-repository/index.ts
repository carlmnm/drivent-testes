import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function getAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelWithRoom(hotelId: number): Promise<Hotel> {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

export default {
  getAllHotels,
  findHotelWithRoom,
};
