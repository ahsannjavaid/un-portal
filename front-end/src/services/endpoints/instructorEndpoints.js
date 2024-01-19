import { BASE_URL } from "../config";

export const instructorEndpoints = {
  loginInstructor: () => `${BASE_URL}login-instructor`,

  registerInstructor: () => `${BASE_URL}instructors`,

  getInstructors: () => `${BASE_URL}instructors-details`,

  editInstructor: (id) => `${BASE_URL}instructor-details/${id}`,

  deleteInstructor: (id) => `${BASE_URL}instructor-details/${id}`,
};
