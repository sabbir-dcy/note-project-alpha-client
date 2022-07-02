import { Routes, Route } from "react-router-dom";
import AddAssignments from "./pages/AddTask/AddAssignments";
import AddLab from "./pages/AddTask/AddLab";
import AddQuiz from "./pages/AddTask/AddQuiz";
import AddTask from "./pages/Dashboard/AddTask";
import Dashboard from "./pages/Dashboard/Dashboard";
import Task from "./pages/Dashboard/Task";
import Home from "./pages/Home/Home";
import Assignment from "./pages/Task/Assignment";
import Lab from "./pages/Task/Lab";
import Quiz from "./pages/Task/Quiz";
import { Toaster } from "react-hot-toast";
import QuizDetails from "./pages/Task/TaskDetails/QuizDetails";
import Exam from "./pages/Task/Exam";
import "react-day-picker/dist/style.css";
import "./daypicker.css";
import Login from "./pages/account/Login";
import AssignmentDetails from "./pages/Task/TaskDetails/AssignmentDetails";
import LabDetails from "./pages/Task/TaskDetails/LabDetails";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <div>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="task"
            element={
              <RequireAuth>
                <Task />
              </RequireAuth>
            }
          >
            <Route path="quiz" element={<Quiz />}>
              <Route path="details/:_id" element={<QuizDetails />}></Route>
            </Route>
            <Route path="assignment" element={<Assignment />}>
              <Route
                path="details/:_id"
                element={<AssignmentDetails />}
              ></Route>
            </Route>
            <Route path="lab" element={<Lab />}>
              <Route path="details/:_id" element={<LabDetails />}></Route>
            </Route>
            <Route path="exam" element={<Exam />}></Route>
          </Route>

          <Route path="addTask" element={<RequireAuth><AddTask /></RequireAuth>}>
            <Route index element={<AddQuiz />}></Route>
            <Route path="assignment" element={<AddAssignments />}></Route>
            <Route path="lab" element={<AddLab />}></Route>
          </Route>

          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
