import model from "./model.js";
export function createAssignments(assignment) {
  delete assignment._id; // Ensure no ID conflicts
  return model.create(assignment);
}

// Retrieve assignments for a specific course
export function findAssignmentForModules(courseId) {
  return model.find({ course: courseId });
}

// Update an assignment
export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}

// Delete an assignment
export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}