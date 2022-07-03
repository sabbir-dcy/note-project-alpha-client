import { Routes, Route } from "react-router-dom";
import AddAssignment from "./pages/AddTask/AddAssignment";
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
import Exam from "./pages/Task/Exam";
import "react-day-picker/dist/style.css";
import "./daypicker.css";
import Login from "./pages/account/Login";
import RequireAuth from "./auth/RequireAuth";
import TaskDetails from "./components/TaskDetails";
import AddExam from "./pages/AddTask/AddExam";
import EditTask from "./pages/EditTask/EditTask";

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
              <Route
                path="details/:category/:_id"
                element={<TaskDetails />}
              ></Route>
            </Route>
            <Route path="assignment" element={<Assignment />}>
              <Route
                path="details/:category/:_id"
                element={<TaskDetails />}
              ></Route>
            </Route>
            <Route path="lab" element={<Lab />}>
              <Route
                path="details/:category/:_id"
                element={<TaskDetails />}
              ></Route>
            </Route>
            <Route path="exam" element={<Exam />}>
              <Route
                path="details/:category/:_id"
                element={<TaskDetails />}
              ></Route>
            </Route>
            <Route path="edit/:category/:_id" element={<EditTask />}></Route>
          </Route>

          <Route
            path="addTask"
            element={
              <RequireAuth>
                <AddTask />
              </RequireAuth>
            }
          >
            <Route path="quiz" element={<AddQuiz />}></Route>
            <Route path="assignment" element={<AddAssignment />}></Route>
            <Route path="lab" element={<AddLab />}></Route>
            <Route path="exam" element={<AddExam />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
