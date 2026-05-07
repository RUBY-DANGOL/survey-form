import express from "express";
import validateSurvey from "../middleware/validateSurvey.js";
import auth from "../middleware/auth.js";
import {
  createSurvey,
  deleteSurvey,
  getSurveyById,
  getSurveyAnalytics,
  getSurveys,
  updateSurvey
} from "../controllers/surveyController.js";

const router = express.Router();

router.get("/", auth, getSurveys);
router.post("/", auth, validateSurvey, createSurvey);
router.get("/:id", getSurveyById);
router.put("/:id", auth, validateSurvey, updateSurvey);
router.delete("/:id", auth, deleteSurvey);
router.get("/:id/analytics", auth, getSurveyAnalytics);

export default router;
