import { Cards } from "@prisma/client";
import { Request, Response } from "express";

import * as cardsService from "../services/cardsService.js";

export async function createOne(req: Request, res: Response) {
    const card = req.body;
    const userId: number = res.locals.id;
    await cardsService.createOne({userId, ...card});
    res.sendStatus(200);
};

export async function getAll(req: Request, res: Response) {
    const userId: number = res.locals.id;
    const cards = await cardsService.getAll(userId);
    res.status(201).send(cards);
}

export async function getOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    const card: Cards = await cardsService.getOne(userId, id);
    res.status(201).send(card);
}

export async function deleteOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    await cardsService.deleteOne(userId, id);
    res.sendStatus(200);
};