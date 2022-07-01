import { Outlet } from "react-router-dom";
import CustomLink from "../../components/CustomLink";

const AddTask = () => {
  return (
    <div className="">
      <h2 className="text-center text-xl">Add tasks</h2>
      <div className="text-center space-x-6 mt-12">
        <CustomLink to="/dashboard/addTask">Quiz</CustomLink>
        <CustomLink to="/dashboard/addTask/assignment">Assignment</CustomLink>
        <CustomLink to="/dashboard/addTask/lab">Lab</CustomLink>
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AddTask;
