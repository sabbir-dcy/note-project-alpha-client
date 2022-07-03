import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../Api/axiosPrivate";
import Calender from "../../components/Calender";
import Spinner from "../../components/Spinner";

const EditTask = () => {
  const { category, _id } = useParams();

  const {
    data: task,
    isLoading,
    refetch,
  } = useQuery(["editTasks", _id], () =>
    axiosPrivate(`/${category}/${_id}`).then((res) => res.data)
  );

  if (isLoading) return <Spinner />;

  return (
    <EditForm task={task} refetch={refetch} category={category} _id={_id} />
  );
};

const EditForm = ({ task, refetch, category, _id }) => {
  const [deadline, setDeadline] = useState(new Date(task.deadline));
  const [calender, setCalender] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    setSpinning(true);
    e.preventDefault();
    const data = {
      topic: e.target.topic.value,
      details: e.target.details.value,
      resource: e.target.resource.value,
      deadline: String(deadline),
    };
    axiosPrivate.put(`/${category}?_id=${_id}`, data).then((res) => {
      console.log(res);
      refetch();
      navigate(`/dashboard/task/${category}`);
      toast.success("updated successfully");
      setSpinning(false);
    });
  };
  if (spinning) return <Spinner />;
  return (
    <div className="bg-gray2 p-10" onClick={() => setCalender(false)}>
      <form onSubmit={onSubmit} className="lg:w-1/2 mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-400 font-medium" htmlFor="course">
              course
            </label>
            <input
              className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
              type="text"
              placeholder="course"
              value={task.course}
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 font-medium" htmlFor="topic">
              topic
            </label>
            <input
              className={`w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200`}
              type="text"
              placeholder="topic"
              defaultValue={task.topic}
              name="topic"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 font-medium" htmlFor="resource">
              resource
            </label>
            <input
              className={`w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200`}
              type="text"
              placeholder="resource"
              defaultValue={task.resource}
              name="resource"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 font-medium" htmlFor="details">
              details
            </label>
            <textarea
              rows="5"
              className="w-full bg-gray3 p-3 rounded-md focus:outline-gray-200"
              placeholder="details (optional)"
              name="details"
              defaultValue={task.details}
            ></textarea>
          </div>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div
              className={`${
                !calender && "hidden"
              } absolute bg-white -top-28 left-12 rounded-2xl`}
            >
              <Calender
                setDate={setDeadline}
                date={deadline}
                setCalender={setCalender}
              />
            </div>

            <input
              className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
              type="text"
              placeholder="assignment number"
              value={format(deadline, "PPP")}
              readOnly
              onClick={(e) => {
                e.stopPropagation();
                setCalender(true);
              }}
            />
          </div>
          <input
            className="w-full bg-blue-100 text-blue-700 h-9 px-3 cursor-pointer hover:bg-blue-200 transition-colors"
            type="submit"
            value="save"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
