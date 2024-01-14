import { BASE_URL } from "../config";

const title = "student/";

export const studentEndpoints = {
  loginStudent: () => `${BASE_URL}${title}login`,

  registerStudent: () => `${BASE_URL}${title}register`,

  getStudents: () => `${BASE_URL}${title}getAll`,

  getSingleStudent: (id) => `${BASE_URL}${title}get/${id}`,

  getAcademics: (id) => `${BASE_URL}${title}getAcademics/${id}`,

  getAttendances: (id) => `${BASE_URL}${title}getAttendances/${id}`,

  editStudent: (id) => `${BASE_URL}${title}edit/${id}`,

  deleteSingleStudent: (id) => `${BASE_URL}${title}delete/${id}`,
};
