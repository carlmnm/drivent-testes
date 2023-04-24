import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { userId } = req;
    const allHotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(allHotels);
  } catch (e) {
    next(e);
  }
}
