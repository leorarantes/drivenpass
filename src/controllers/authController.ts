import { Request, Response } from "express";

import * as authService from "../services/authService.js";
import { UserData } from "../utils/interfaces.js";

export async function signUp(req: Request, res: Response) {
    const user: UserData = req.body;
    await authService.signUp(user);
    res.sendStatus(200);
};

export async function signIn(req: Request, res: Response) {
    const user: UserData = req.body;
    const token = await authService.signUp(user);
    res.status(201).send(token);
};