import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Calender from "./Calender";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { auth } from "../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { axiosPrivate } from "../Api/axiosPrivate";
import Spinner from "./Spinner";

const AddTaskForm = ({ category, bgAccent, textAccent }) => {
  const [date, setDate] = useState(new Date());
  const [calender, setCalender] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [user] = useAuthState(auth);

  const {
    register,
    // formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data = { ...data, deadline: format(date, "PPP") };
    setSpinning(true);
    axiosPrivate
      .post(`/${category}`, data, {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        setSpinning(false);

        reset();
      });
  };
  if (spinning) return <Spinner />;
  return (
    <div className="bg-gray2 p-10" onClick={() => setCalender(false)}>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 mx-auto">
        <div className="space-y-4">
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="text"
            placeholder="course"
            {...register("course")}
          />
          <input
            className={`w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200`}
            type="text"
            placeholder="topic"
            {...register("topic")}
          />
          <textarea
            rows="5"
            className="w-full bg-gray3 p-3 rounded-md focus:outline-gray-200"
            placeholder="details (optional)"
            {...register("details")}
          ></textarea>
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="text"
            placeholder="resource link (optional)"
            {...register("resource")}
          />

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div
              className={`${
                !calender && "hidden"
              } absolute bg-white -top-28 left-12 rounded-2xl`}
            >
              <Calender
                setDate={setDate}
                date={date}
                setCalender={setCalender}
              />
            </div>

            <input
              className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
              type="text"
              placeholder="assignment number"
              value={format(date, "PPP")}
              readOnly
              onClick={(e) => {
                e.stopPropagation();
                setCalender(true);
              }}
            />
          </div>
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="number"
            placeholder={`${category} number (optional)`}
            {...register("taskNumber")}
          />
          <input
            className={` ${bgAccent} w-full h-9  rounded-md ${textAccent} cursor-pointer`}
            type="submit"
            value={`add ${category}`}
          />
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
