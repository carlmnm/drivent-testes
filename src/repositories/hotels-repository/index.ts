import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function getAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

export default {
  getAllHotels,
};
