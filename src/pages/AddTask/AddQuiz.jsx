
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Calender from "../../components/Calender";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { axiosPrivate } from "../../Api/axiosPrivate";
const AddQuiz = () => {
  const [date, setDate] = useState(new Date());
  const [calender, setCalender] = useState(false);
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data = { ...data, quizDay: format(date, "PPP") };

    axiosPrivate
      .post("/quiz", data, {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        reset();
      });
  };
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
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
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
          <div className="relative">
            <div
              className={`${
                !calender && "hidden"
              } absolute bg-white -top-24 left-40 rounded-2xl`}
            >
              <Calender
                setDate={setDate}
                date={date}
                setCalender={setCalender}
              />
            </div>

            <input
              className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
              type="topic"
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
            type="text"
            placeholder="quiz number (optional)"
            {...register("quizNumber")}
          />
          <input
            className="w-full h-9 bg-blue0 rounded-md text-blue-700 cursor-pointer"
            type="submit"
            value="add quiz"
          />
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
