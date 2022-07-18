import { Request, Response, NextFunction } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.error(error);

    if (error.type === "error_x") {
        return res.sendStatus(500).status(error.message);
    }

    return res.status(500).send("Internal Server Error");
}