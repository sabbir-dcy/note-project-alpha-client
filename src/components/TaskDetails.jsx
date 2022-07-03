import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { axiosPrivate } from "../Api/axiosPrivate";

const TaskDetails = () => {
  const { category, _id } = useParams();

  let dateTitle = "deadline";
  if (category === "quiz" || category === "exam") dateTitle = "on";

  const [task, setTask] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axiosPrivate(`/${category}/${_id}`).then((res) => setTask(res.data));
  }, [_id, category]);
  return (
    <div className="bg-gray2 p-8 relative">
      <div className="border-b text-center p-3">
        <h2>
          {category} {task.taskNumber}
        </h2>
      </div>
      <div className="grid grid-cols-2">
        <div className="space-y-2">
          <p>
            <span className="text-gray-400">course</span> : {task.course}
          </p>
          <p>
            <span className="text-gray-400">{dateTitle}</span> : {task.deadline}
          </p>
          <p>
            <span className="text-gray-400">topic</span> : {task.topic}
          </p>
          <a
            href={task.resource}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-400"
          >
            resource link
          </a>
        </div>
        <div>
          <p>
            <span className="text-gray-400">details</span> : {task.details}
          </p>
        </div>
      </div>
      <div>
        <AiFillCloseCircle
          className="text-2xl text-red-400 absolute top-4 right-4 cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => navigate(`/dashboard/task/${category}`)}
        />
      </div>
    </div>
  );
};

export default TaskDetails;
