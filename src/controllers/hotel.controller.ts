import { Request, Response, NextFunction } from "express";
import { createHotelService, getHotelByIdService } from "../services/hotel.service";
import { InternalServerError } from "../utils/errors/app.error";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    //1. Call the service layer
    const hotelResponse = await createHotelService(req.body);

    //2. Send response
    res.status(201).json({
        message: 'Hotel created successfully',
        data: hotelResponse,
        success: true,
    })
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const hotelResponse = await getHotelByIdService(Number(req.params.id));
        console.log('running------', hotelResponse);
        
        res.status(200).json({
            message: 'Hotel fetched successfully',
            data: hotelResponse,
            success: true,
        });
    } catch (error) {
        console.log('Error in controller', error);
        throw new InternalServerError('Something went wrong');
    }
}