import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: String
  }],
  score: { type: Number, default: 0 },
  attemptDate: { type: Date, default: Date.now }
});

const questionSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["True/False", "Multiple Choice", "Fill in the Blank"], required: true },
  points: Number,
  questionText: String,
  options: [String],
  correctAnswers: [String],
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    points: { type: Number, default: 0 },
    dueDate: Date,
    availableFrom: Date,
    availableUntil: Date,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimitMinutes: { type: Number, default: 20 },
    multipleAttemptsAllowed: { type: Boolean, default: false },
    maxAttemptsAllowed: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Never" }, // "Never", "After Due Date", etc.
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    questionsLockAfterAnswering: { type: Boolean, default: false },
    assignmentGroup: { type: String, default: "Quizzes" },
    published: { type: Boolean, default: false },
    questions: [questionSchema],
    attempts: [attemptSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;
