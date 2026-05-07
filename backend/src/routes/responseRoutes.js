import express from "express";
import { getResponses, submitResponse } from "../controllers/responseController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/responses", submitResponse);
router.get("/:id/responses", auth, getResponses);

export default router;
