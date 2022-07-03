import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { axiosPrivate } from "../../Api/axiosPrivate";
import Spinner from "../../components/Spinner";
import SingleTask from "../../components/SingleTask";
import { motion } from "framer-motion";

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

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-center">server side error</p>;

  return (
    <>
      <div className="mb-4">
        <Outlet />
        {assignments.length === 0 && (
          <p className="text-center text-2xl text-gray-300">empty</p>
        )}
      </div>
      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <SingleTask task={assignment} refetch={refetch} category="assignment" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Assignment;
