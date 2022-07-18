import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.post('/credentials', validateSchema(credentialSchema), validateToken, createOne);
credentialsRouter.get('/credentials', validateToken, getAll);
credentialsRouter.get('/credentials/:id', validateToken, getOne);
credentialsRouter.delete('/credentials/:id', validateToken, deleteOne);

export default credentialsRouter;