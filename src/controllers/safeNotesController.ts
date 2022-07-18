import { Request, Response } from "express";
import { Safenotes } from "@prisma/client";

import * as safeNotesService from "../services/safeNotesService.js";

export async function createOne(req: Request, res: Response) {
    const safeNote = req.body;
    const userId: number = res.locals.id;
    await safeNotesService.createOne({userId, ...safeNote});
    res.sendStatus(200);
};

export async function getAll(req: Request, res: Response) {
    const userId: number = res.locals.id;
    const safeNotes = await safeNotesService.getAll(userId);
    res.status(201).send(safeNotes);
}

export async function getOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    const safeNote: Safenotes = await safeNotesService.getOne(userId, id);
    res.status(201).send(safeNote);
}

export async function deleteOne(req: Request, res: Response) {
    const id: string = req.params.id;
    const userId: number = res.locals.id;
    await safeNotesService.deleteOne(userId, id);
    res.sendStatus(200);
};