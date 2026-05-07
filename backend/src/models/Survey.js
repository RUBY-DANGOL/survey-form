import mongoose from "mongoose";

const ConditionSchema = new mongoose.Schema(
  {
    questionId: { type: String },
    operator: { type: String, enum: ["equals"], default: "equals" },
    value: { type: mongoose.Schema.Types.Mixed }
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "single", "multi", "rating"],
      required: true
    },
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: { type: [String], default: [] },
    condition: { type: ConditionSchema, default: null }
  },
  { _id: false }
);

const SurveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    questions: { type: [QuestionSchema], default: [] }
  },
  { timestamps: true }
);

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;
