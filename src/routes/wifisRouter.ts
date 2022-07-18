import {Router} from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import wifiSchema from "../schemas/wifiSchema.js";
import { createOne, getAll, getOne, deleteOne } from "../controllers/wifisController.js";

const wifisRouter = Router();

wifisRouter.post('/wifis', validateSchema(wifiSchema), validateToken, createOne);
wifisRouter.get('/wifis', validateToken, getAll);
wifisRouter.get('/wifis/:id', validateToken, getOne);
wifisRouter.delete('/wifis/:id', validateToken, deleteOne);

export default wifisRouter;