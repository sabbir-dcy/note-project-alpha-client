import React from "react";
import SingleAssignment from "./SingleAssignment";
import { useQuery } from "react-query";
import axios from "axios";
import { Outlet } from "react-router-dom";

const Assignment = () => {
  const {
    isLoading,
    error,
    data: assignments,
    refetch,
  } = useQuery("assignments", () =>
    axios(`http://localhost:5000/assignment`, {
      params: {
        user: "62be09c02797fe70073495ac",
      },
    }).then((res) => {
      return res.data;
    })
  );

  if (isLoading || error) return;
  return (
    <>
      <div className="mb-4">
        <Outlet />
        {assignments.length === 0 && (
          <p className="text-center text-2xl text-gray-300">empty</p>
        )}
      </div>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <SingleAssignment
            key={assignment._id}
            assignment={assignment}
            refetch={refetch}
          />
        ))}
      </div>
    </>
  );
};

export default Assignment;
