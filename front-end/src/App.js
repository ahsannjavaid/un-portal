import "./styling/account.css";
import "./styling/instructorLogin.css";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Student from "./pages/Student/Login/Student";
import Instructor from "./pages/Instructor/Signup/Instructor";
import InstructorLogin from "./pages/Instructor/Login/InstructorLogin";
import InstructorInterface from "./pages/Instructor/Home/InstructorInterface";
import Admin from "./pages/Admin/Admin";
import Account from "./pages/Instructor/Settings/Account";
import AddStudent from "./pages/Instructor/AddStudent/AddStudent";
import ViewStudents from "./pages/Instructor/YourStudents/ViewStudents";
import PostMarks from "./pages/Instructor/PostMarks/PostMarks";
import StudentInterface from "./pages/Student/Home/StudentInterface";
import AccountS from "./pages/Student/Settings/AccountS";
import Marks from "./pages/Student/Marks/Marks";
import Footer from "./components/Footer";
import Error from "./pages/Error/Error";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="student" element={<Student />} />
          <Route path="instructor-login" element={<InstructorLogin />} />
          <Route
            path="instructor-interface"
            element={<InstructorInterface />}
          />
          <Route path="admin" element={<Admin />} />
          <Route path="account" element={<Account />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="view-students" element={<ViewStudents />} />
          <Route path="post-marks" element={<PostMarks />} />
          <Route path="student-interface" element={<StudentInterface />} />
          <Route path="accountS" element={<AccountS />} />
          <Route path="marks" element={<Marks />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </HashRouter>
      <Footer />
    </>
  );
}

export default App;
