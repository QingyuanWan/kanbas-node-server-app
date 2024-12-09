import model from "./model.js";

export async function findLastAttempt(quizId, userId) {
  const quiz = await model.findById(quizId);
  if (!quiz) return null;
  const userAttempts = quiz.attempts.filter(a => String(a.student) === String(userId));
  if (userAttempts.length === 0) return null;
  userAttempts.sort((a, b) => b.attemptDate - a.attemptDate);
  return userAttempts[0];
}

export async function submitAttempt(quizId, userId, answers) {
  const quiz = await model.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  const userAttempts = quiz.attempts.filter(a => String(a.student) === String(userId));
  const attemptsCount = userAttempts.length;

  if (!quiz.multipleAttemptsAllowed && attemptsCount >= 1) {
    throw new Error("No more attempts allowed");
  }
  if (quiz.multipleAttemptsAllowed && attemptsCount >= quiz.maxAttemptsAllowed) {
    throw new Error("Max attempts reached");
  }

  let score = 0;
  for (const ans of answers) {
    const q = quiz.questions.find(q => String(q._id) === String(ans.questionId));
    if (q) {
      if (q.correctAnswers.includes(ans.answer)) {
        score += q.points;
      }
    }
  }

  const newAttempt = {
    student: userId,
    answers,
    score,
    attemptDate: new Date()
  };
  quiz.attempts.push(newAttempt);
  await quiz.save();

  return { score, answers, attemptDate: newAttempt.attemptDate };
}
