import { BASE_URL } from "../config";

export const examEndpoints = {
  postMarks: () => `${BASE_URL}marks`,

  getMarks: () => `${BASE_URL}marks-details`,

  getParticularMarks: (email) => `${BASE_URL}get-particular-marks?email=${email}`,
};
