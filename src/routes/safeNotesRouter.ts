import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import safeNoteSchema from "../schemas/safeNoteSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/safeNotesController.js";

const safeNotesRouter = Router();

safeNotesRouter.post('/safe-notes', validateSchema(safeNoteSchema), validateToken, createOne);
safeNotesRouter.get('/safe-notes', validateToken, getAll);
safeNotesRouter.get('/safe-notes/:id', validateToken, getOne);
safeNotesRouter.delete('/safe-notes/:id', validateToken, deleteOne);

export default safeNotesRouter;