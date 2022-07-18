import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import safeNoteSchema from "../schemas/safeNoteSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/safeNotesController.js";

const safeNoteRouter = Router();

safeNoteRouter.post('/safeNotes', validateSchema(safeNoteSchema), validateToken, createOne);
safeNoteRouter.get('/safeNotes', validateToken, getAll);
safeNoteRouter.get('/safeNotes/:id', validateToken, getOne);
safeNoteRouter.delete('/safeNotes/:id', validateToken, deleteOne);

export default safeNoteRouter;