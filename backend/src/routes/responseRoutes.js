import express from "express";
import { getResponses, submitResponse } from "../controllers/responseController.js";

const router = express.Router();

router.post("/:id/responses", submitResponse);
router.get("/:id/responses", getResponses);

export default router;
