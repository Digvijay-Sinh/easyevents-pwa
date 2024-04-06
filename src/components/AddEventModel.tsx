import { Button } from "flowbite-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthProvider";
// import { axiosPrivate } from "../api/axios";
// import { useHistory } from "react-router-dom";

interface LazyCustomModalProps {
  modalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const AddEventModel: React.FC<LazyCustomModalProps> = ({
  handleCloseModal,
}) => {
  const navigate = useNavigate();
  //   const history = useHistory();

  const { auth } = useAuth();

  const handleLoginClick = () => {
    navigate("/login", {
      state: { from: "addevent" },
    });
    handleCloseModal();
  };
  const handleContinueClick = () => {
    navigate("/addevent");
    handleCloseModal();
  };
  return (
    <>
      {/* <div
        className="fixed inset-0 bg-black opacity-90"
        onClick={handleCloseModal}
      ></div> */}
      <div className="fixed bg-black rounded-lg top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[58%]  md:w-[60vw] w-[90vw] flex items-center justify-center z-50">
        <div className="bg-surface-200 h-full rounded-lg shadow-inner  shadow-slate-300 w-full ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-white">
              Create an Event
            </h3>
            <button
              type="button"
              className="text-gray-200 bg-transparent hover:bg-purple-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="p-4 md:p-5 text-white">
            {/* main content */}
            <div className="flex w-full flex-col items-center gap-3 justify-center">
              {auth?.accessToken ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  {" "}
                  <span>Do you want to host an Event?</span>
                  <Button onClick={handleContinueClick}>Continue</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3">
                  {" "}
                  <span>You need to login first </span>
                  <Button onClick={handleLoginClick}>Login</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventModel;
