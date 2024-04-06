import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center w-full mt-10 absolute top-[40%]  items-center">
      <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
    </div>
    // <div className="rounded-full h-12 w-12 border-4 border-t-4 border-white animate-spin absolute top-[40%]  left-1/2"></div>
  );
};

export default Loader;
