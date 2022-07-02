import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen grid items-center justify-items-center">
      <div className="space-y-8">
        <h2 className="text-2xl font-medium">
          Sleet note, An open source project
        </h2>
        <Link
          to="/dashboard/task/quiz"
          className="bg-orange-100 shadow-md px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors block w-fit"
        >
          {"go to dashboard >"}
        </Link>

        <div className="space-y-2">
          <a
            href="https://github.com/sabbir-dcy/note-project-alpha-client"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            source code
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
