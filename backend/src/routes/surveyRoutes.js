import express from "express";
import validateSurvey from "../middleware/validateSurvey.js";
import {
  createSurvey,
  deleteSurvey,
  getSurveyById,
  getSurveyAnalytics,
  getSurveys,
  updateSurvey
} from "../controllers/surveyController.js";

const router = express.Router();

router.get("/", getSurveys);
router.post("/", validateSurvey, createSurvey);
router.get("/:id", getSurveyById);
router.put("/:id", validateSurvey, updateSurvey);
router.delete("/:id", deleteSurvey);
router.get("/:id/analytics", getSurveyAnalytics);

export default router;
