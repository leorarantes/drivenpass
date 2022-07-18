import { Wifis } from "@prisma/client";
import { Request, Response } from "express";

import * as wifisService from "../services/wifisService.js";

export async function createOne(req: Request, res: Response) {
    const wifi = req.body;
    const userId: number = res.locals.id;
    await wifisService.createOne({userId, ...wifi});
    res.sendStatus(200);
};

export async function getAll(req: Request, res: Response) {
    const userId: number = res.locals.id;
    const wifis = await wifisService.getAll(userId);
    res.status(201).send(wifis);
}

export async function getOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    const wifi: Wifis = await wifisService.getOne(userId, id);
    res.status(201).send(wifi);
}

export async function deleteOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    await wifisService.deleteOne(userId, id);
    res.sendStatus(200);
};