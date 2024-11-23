import * as enrollmentDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: "User ID and Course ID are required" });
    }

    try {
      enrollmentDao.enrollUserInCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ error: "Failed to enroll user" });
    }
  });

  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: "User ID and Course ID are required" });
    }

    try {
      enrollmentDao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).json({ error: "Failed to unenroll user" });
    }
  });

  app.get("/api/users/:userId/courses", (req, res) => {
    const { userId } = req.params;

    try {
      const courses = enrollmentDao.findEnrolledCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching user's courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;

    try {
      const enrollments = enrollmentDao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching user's enrollments:", error);
      res.status(500).json({ error: "Failed to fetch enrollments" });
    }
  });
}
