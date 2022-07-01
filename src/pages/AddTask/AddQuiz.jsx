import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddQuiz = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/quiz", data, {
        params: {
          _id: "62be09c02797fe70073495ac",
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        reset();
      });
  };
  return (
    <div className="bg-gray2 p-10">
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
            placeholder="details"
            {...register("details")}
          ></textarea>
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="text"
            placeholder="resource link"
            {...register("resource")}
          />
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="text"
            placeholder="quiz day"
            {...register("quizDay")}
          />
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="text"
            placeholder="quiz number"
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
