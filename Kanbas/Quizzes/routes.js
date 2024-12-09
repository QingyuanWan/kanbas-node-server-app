import * as dao from "./dao.js";
import * as attemptDao from "./attemptDao.js";

export default function QuizRoutes(app) {
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quiz = { ...req.body, course: courseId };
    try {
      const newQuiz = await dao.createQuiz(quiz);
      res.json(newQuiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).send({ error: "Failed to create quiz" });
    }
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await dao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).send({ error: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await dao.findQuizById(quizId);
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).send({ error: "Failed to fetch quiz" });
    }
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await dao.updateQuiz(quizId, req.body);
      res.json(status);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).send({ error: "Failed to update quiz" });
    }
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await dao.deleteQuiz(quizId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).send({ error: "Failed to delete quiz" });
    }
  });






  app.get("/api/quizzes/:quizId/attempts/current", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { quizId } = req.params;
    try {
      const quiz = await dao.findQuizById(quizId);
      if (!quiz) return res.sendStatus(404);

      const lastAttempt = await attemptDao.findLastAttempt(quizId, currentUser._id);
      const userAttempts = quiz.attempts.filter(a => String(a.student) === String(currentUser._id)).length;
      const attemptsUsed = userAttempts;
      const attemptsRemaining = quiz.multipleAttemptsAllowed ? (quiz.maxAttemptsAllowed - attemptsUsed) : (attemptsUsed === 0 ? 1 : 0);

      res.json({
        quiz,
        attempt: lastAttempt || null,
        attemptsUsed,
        attemptsRemaining
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({error: "Failed to fetch attempt"});
    }
  });

  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { quizId } = req.params;
    const { answers } = req.body;
    try {
      const result = await attemptDao.submitAttempt(quizId, currentUser._id, answers);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(400).send({error: error.message});
    }
  });










}
