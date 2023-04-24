import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { userId } = req;
    const allHotels = await hotelsService.getHotels(userId);
    if (!allHotels) throw httpStatus.PAYMENT_REQUIRED;
    return res.status(httpStatus.OK).send(allHotels);
  } catch (e) {
    next(e);
  }
}

export async function getHotelsWithRooms(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const { userId } = req;
    const { hotelId } = req.query;
    const hotelWithRooms = await hotelsService.getHotelsWithRooms(+userId, +hotelId);
    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (e) {
    next(e);
  }
}
