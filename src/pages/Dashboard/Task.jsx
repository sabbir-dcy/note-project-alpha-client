import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Task = () => {
  const { pathname } = useLocation();

  return (
    <div className="">
      <h2 className="text-center text-xl">All tasks</h2>
      <div className="text-center space-x-6 mt-12">
        <Link
          className={`${
            pathname.includes("quiz") && "bg-blue0"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/task/quiz"
        >
          Quiz
        </Link>
        <Link
          className={`${
            pathname.includes("assignment") && "bg-blue0"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/task/assignment"
        >
          Assignment
        </Link>
        <Link
          className={`${
            pathname.includes("lab") && "bg-blue0"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/task/lab"
        >
          Lab
        </Link>
        <Link
          className={`${
            pathname.includes("exam") && "bg-blue0"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/task/exam"
        >
          Exam
        </Link>
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Task;
