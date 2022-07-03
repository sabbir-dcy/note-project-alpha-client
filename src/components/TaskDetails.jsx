import { useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { axiosPrivate } from "../Api/axiosPrivate";
import { format } from "date-fns";
import { useQuery } from "react-query";

const TaskDetails = () => {
  const { category, _id } = useParams();
  const navigate = useNavigate();

  let dateTitle = "deadline";
  if (category === "quiz" || category === "exam") dateTitle = "on";

  const {
    data: task,
    isLoading,
    error,
    refetch,
  } = useQuery(["detailsTask", _id], () =>
    axiosPrivate(`/${category}/${_id}`).then((res) => res.data)
  );
  if (isLoading) return;

  return (
    <div className="bg-gray2 p-8 relative">
      <div className="border-b text-center p-3">
        <h2>
          {category} {task.taskNumber}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-2">
          <p>
            <span className="text-gray-400">course</span> : {task.course}
          </p>
          <p>
            <span className="text-gray-400">{dateTitle}</span> :{" "}
            {format(new Date(task?.deadline), "PP")}
          </p>
          <p>
            <span className="text-gray-400">topic</span> : {task.topic}
          </p>
          <a
            href={task.resource}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-400 block"
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

      <div className="flex justify-end">
        <button
          className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300 transition-colors"
          onClick={() => navigate(`/dashboard/task/edit/${category}/${_id}`)}
        >
          <AiFillEdit />
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
