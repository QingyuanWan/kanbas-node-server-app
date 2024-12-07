import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    name: String,
    description: String,
    dueDate: Date,
    points: Number,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" }, // One-to-many relationship with courses
  },
  { collection: "assignments" }
);

export default schema;