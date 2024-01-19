import { BASE_URL } from "../config";

export const studentEndpoints = {
  loginStudent: () => `${BASE_URL}login-student`,

  registerStudent: () => `${BASE_URL}students`,

  getStudents: () => `${BASE_URL}students-details`,

  getParticularStudents: (email) => `${BASE_URL}get-particular-students?email=${email}`,

  getMarksOfParticularStudent: (id) => `${BASE_URL}get-particular-student-marks/${id}`,

  editStudent: (id) => `${BASE_URL}student-details/${id}`,

  deleteSingleStudent: (id) => `${BASE_URL}student-details/${id}`,
};
