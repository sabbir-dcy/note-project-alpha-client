import React from "react";
import SingleAssignment from "./SingleAssignment";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { axiosPrivate } from "../../Api/axiosPrivate";
import Spinner from "../../components/Spinner";

const Assignment = () => {
  const [user] = useAuthState(auth);
  const {
    isLoading,
    error,
    data: assignments,
    refetch,
  } = useQuery(["assignments", user], () =>
    axiosPrivate(`/assignment`, {
      params: {
        user: user?.email,
      },
    }).then((res) => {
      return res.data;
    })
  );

  if (isLoading || error) return <Spinner  />;
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
