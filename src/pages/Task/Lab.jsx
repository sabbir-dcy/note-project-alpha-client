import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { axiosPrivate } from "../../Api/axiosPrivate";
import SingleTask from "../../components/SingleTask";
import { auth } from "../../firebase/firebase.init";
import { motion } from "framer-motion";

const Lab = () => {
  const [user] = useAuthState(auth);
  const {
    isLoading,
    error,
    data: labs,
    refetch,
  } = useQuery(["labs", user], () =>
    axiosPrivate(`/lab`, {
      params: {
        user: user?.email,
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
        {labs.length === 0 && (
          <p className="text-center text-2xl text-gray-300">empty</p>
        )}
      </div>
      <div className="space-y-4">
        {labs.map((lab, index) => (
          <motion.div
            key={lab._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <SingleTask task={lab} refetch={refetch} category="exam" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Lab;
