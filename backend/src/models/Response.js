import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed }
  },
  { _id: false }
);

const ResponseSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: "Survey", required: true },
  answers: { type: [AnswerSchema], default: [] },
  submittedAt: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", ResponseSchema);

export default Response;
