import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";

export async function createOne(req: Request, res: Response) {
    const credential = req.body;
    const userId: number = res.locals.id;
    await credentialsService.createOne({userId, ...credential});
    res.sendStatus(200);
};

export async function getAll(req: Request, res: Response) {
    const userId: number = res.locals.id;
    const credentials = credentialsService.getAll(userId);
    res.status(201).send(credentials);
}

export async function getOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    const credential = credentialsService.getOne(userId, id);
    res.status(201).send(credential);
}

export async function deleteOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    await credentialsService.deleteOne(userId, id);
    res.sendStatus(200);
};