import { useNavigate } from "react-router-dom";
// import DemoAddEvent from "./DemoAddEvent";
import AddEventForm from "./AddEventForm";
import { useState } from "react";
import AddEventForm22 from "./AddEventForm22";
import AddEventForm3 from "./AddEventForm3";
import AddEventForm4 from "./AddEventForm4";

const AddEventPage = () => {
  const navigate = useNavigate();
  const [eventId, setEventId] = useState(0); // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);

  const formShow = () => {
    if (showForm1 && !showForm2 && !showForm3 && !showForm4) {
      return (
        <AddEventForm
          eventId={eventId}
          setEventId={setEventId}
          showForm1={showForm1}
          showForm2={showForm2}
          showForm3={showForm3}
          showForm4={showForm4}
          setShowForm1={setShowForm1}
          setShowForm2={setShowForm2}
          setShowForm3={setShowForm3}
          setShowForm4={setShowForm4}
        />
      );
    }
    if (!showForm1 && showForm2 && !showForm3 && !showForm4) {
      return (
        <AddEventForm22
          eventId={eventId}
          setEventId={setEventId}
          showForm1={showForm1}
          showForm2={showForm2}
          showForm3={showForm3}
          showForm4={showForm4}
          setShowForm1={setShowForm1}
          setShowForm2={setShowForm2}
          setShowForm3={setShowForm3}
          setShowForm4={setShowForm4}
        />
      );
    }
    if (!showForm1 && !showForm2 && showForm3 && !showForm4) {
      return (
        <AddEventForm3
          eventId={eventId}
          setEventId={setEventId}
          showForm1={showForm1}
          showForm2={showForm2}
          showForm3={showForm3}
          showForm4={showForm4}
          setShowForm1={setShowForm1}
          setShowForm2={setShowForm2}
          setShowForm3={setShowForm3}
          setShowForm4={setShowForm4}
        />
      );
    }
    // if (!showForm1 && !showForm2 && !showForm3 && showForm4) {
    //   return <AddEventForm4
    //   eventId={eventId}
    //   setEventId={setEventId}
    //   showForm1={showForm1}
    //   showForm2={showForm2}
    //   showForm3={showForm3}
    //   showForm4={showForm4}
    //   setShowForm1={setShowForm1}
    //   setShowForm2={setShowForm2}
    //   setShowForm3={setShowForm3}
    //   setShowForm4={setShowForm4}/>;
    // }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
      className=""
    >
      <div className="w-full px-2 p-10">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li
            className={`flex md:w-full items-center
             ${showForm1 ? "text-blue-500" : "text-gray-300"}
            ${showForm2 && !showForm1 ? "text-green-500" : "text-blue-500"}
            ${showForm3 && !showForm1 ? "text-green-500" : "text-blue-500"}

            text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {(!showForm1 && showForm2) || (!showForm1 && showForm3) ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="me-2">1</span>
              )}
              Basic <span className=" sm:inline-flex sm:ms-2">Details</span>
            </span>
          </li>
          <li
            className={`flex md:w-full items-center ${
              showForm2 ? "text-blue-500" : "text-gray-300"
            }
            ${showForm3 && !showForm2 ? "text-green-500" : "text-blue-500"}
            text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {!showForm2 && showForm3 ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="me-2">2</span>
              )}
              Add <span className=" sm:inline-flex sm:ms-2">Speakers</span>
            </span>
          </li>
          <li
            className={`flex md:w-full items-center ${
              showForm3 ? "text-blue-500" : "text-gray-300"
            } `}
          >
            {" "}
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {showForm3 ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="me-2">3</span>
              )}
              Upload <span className=" sm:inline-flex sm:ms-2">Poster</span>
            </span>
          </li>
        </ol>
      </div>
      <div>{formShow()}</div>
      {/* AddEventPage
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/eventgroup");
          }}
        >
          Publish event
        </button>
      </div> */}
    </div>
  );
};

export default AddEventPage;
