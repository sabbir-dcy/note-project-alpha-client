import { Link, Outlet, useLocation } from "react-router-dom";
import CustomLink from "../../components/CustomLink";

const AddTask = () => {
  const { pathname } = useLocation();
  return (
    <div className="">
      <h2 className="text-center text-xl">Add tasks</h2>
      <div className="text-center space-x-6 mt-12">
        <Link
          className={`${
            pathname.includes("quiz") && "bg-blue0"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/addTask/quiz"
        >
          Quiz
        </Link>
        <Link
          to="/dashboard/addTask/assignment"
          className={`${
            pathname.includes("assignment") && "bg-purple-100"
          } px-3 rounded-2xl py-1`}
        >
          Assignment
        </Link>
        <Link
          to="/dashboard/addTask/lab"
          className={`${
            pathname.includes("lab") && "bg-red-100"
          } px-3 rounded-2xl py-1`}
        >
          Lab
        </Link>
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AddTask;
