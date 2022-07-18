import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/credentialsController.js";

const credentialRouter = Router();

credentialRouter.post('/credentials', validateSchema(credentialSchema), validateToken, createOne);
credentialRouter.get('/credentials', validateToken, getAll);
credentialRouter.get('/credentials/:id', validateToken, getOne);
credentialRouter.delete('/credentials/:id', validateToken, deleteOne);

export default credentialRouter;