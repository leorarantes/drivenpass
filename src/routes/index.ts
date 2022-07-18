import { Router } from "express";

import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";
import cardsRouter from "./cardsRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(cardsRouter);

export default router;