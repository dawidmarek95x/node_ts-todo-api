import { Router } from "express";
const router = Router();

import todosRouter from "./todos";

router.use("/todos", todosRouter);

export default router;