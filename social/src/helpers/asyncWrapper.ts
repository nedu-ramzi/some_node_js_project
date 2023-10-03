import express from 'express';

export const asyncWrapper = (controller : any)=> async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        await controller(req, res, next);
    } catch (e) {
        next (e)
    }
}