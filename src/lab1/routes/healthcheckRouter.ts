import {Router} from "express";
import {getHealthcheck} from "../controllers/healthcheckController";

const router = Router();

router.get('/healthcheck', getHealthcheck);

export default router;