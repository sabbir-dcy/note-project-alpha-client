import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";
const ModalRemove = ({ handleRemove, setModal }) => {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] h-screen w-full absolute top-0 left-0 grid justify-items-center items-center">
      <div className="bg-gray3 rounded-lg p-4 relative">
        <h2 className="mt-4">do you want to remove this task?</h2>
        <button
          className="bg-blue-100 text-blue-700 px-5 py-1 rounded-md block mx-auto mt-4"
          onClick={handleRemove}
        >
          yes
        </button>
        <AiFillCloseCircle
          className="text-2xl absolute top-2 right-2 text-red-400 cursor-pointer"
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

export default ModalRemove;
