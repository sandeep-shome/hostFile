import { Link } from "react-router-dom";
import Steps from "../components/Steps";
import steps from "../data/steps";

const Home = () => {
  return (
    <div className="">
      <div className=" px-4 sm:px-9 md:px-12 lg:px-20 xl:px-32 2xl:px-40 background-gradient w-full conatiner h-screen flex items-center justify-center flex-col dark:bg-slate-900">
        <h1 className="text-center text-3xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl font-bold text-slate-800 dark:text-gray-200">
          <span className="text-blue-500">Share</span> &{" "}
          <span className="text-blue-500">Upload</span> <br /> your file within
          seconds
        </h1>
        <p className="text-center mt-5 text-slate-800 text-sm xl:text-base dark:text-gray-400">
          Want to get rid of uploading and sharing file in a long process, don't
          worry, you are at the right place
        </p>
        <p className="text-center mt-1 text-slate-800 text-sm xl:text-base dark:text-gray-400">
          Upload and share file without any hesitation and time wasting
        </p>
        <Link to={"/dashboard"} className="btn-primary mt-10">
          get started
        </Link>
      </div>
      <div className=" mt-10 w-full px-4 sm:px-9 md:px-12 lg:px-20 xl:px-32 2xl:px-40 dark:bg-slate-900">
        <h4 className="text-center text-xl dark:text-gray-200">How to use</h4>
        <div className="w-full mt-8 flex items-center flex-col">
          {steps.map((step, index) => {
            return (
              <Steps
                img={step.img}
                title={step.title}
                index={index}
                key={step.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
