import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import cardSchema from "../schemas/cardSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post('/cards', validateSchema(cardSchema), validateToken, createOne);
cardsRouter.get('/cards', validateToken, getAll);
cardsRouter.get('/cards/:id', validateToken, getOne);
cardsRouter.delete('/cards/:id', validateToken, deleteOne);

export default cardsRouter;