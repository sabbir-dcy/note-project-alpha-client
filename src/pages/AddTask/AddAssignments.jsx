import React from "react";
import { useForm } from "react-hook-form";

const AddAssignments = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="bg-gray2 p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
        <div className="space-y-4">
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="text"
            placeholder="course"
          />
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="topic"
            placeholder="topic"
          />
          <textarea
            rows="5"
            className="w-full bg-gray3 p-3 rounded-md focus:outline-gray-200"
            placeholder="details"
          ></textarea>
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="topic"
            placeholder="resource link"
          />
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="topic"
            placeholder="deadline"
          />
          <input
            className="w-full bg-gray3 h-9 px-3 rounded-md focus:outline-gray-200"
            type="topic"
            placeholder="assignment number"
          />
          <input
            className="w-full h-9 bg-blue0 rounded-md text-blue-700"
            type="submit"
            value="add assignment"
          />
        </div>
      </form>
    </div>
  );
};

export default AddAssignments;
