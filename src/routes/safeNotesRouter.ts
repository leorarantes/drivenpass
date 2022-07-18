import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import safeNoteSchema from "../schemas/safeNoteSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/safeNotesController.js";

const safeNotesRouter = Router();

safeNotesRouter.post('/safeNotes', validateSchema(safeNoteSchema), validateToken, createOne);
safeNotesRouter.get('/safeNotes', validateToken, getAll);
safeNotesRouter.get('/safeNotes/:id', validateToken, getOne);
safeNotesRouter.delete('/safeNotes/:id', validateToken, deleteOne);

export default safeNotesRouter;