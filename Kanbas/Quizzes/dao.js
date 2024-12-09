import model from "./model.js";

export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findQuizById(quizId) {
  return model.findById(quizId);
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, { $set: quizUpdates });
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}
