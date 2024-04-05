import { Button } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthProvider";
import { axiosPrivate } from "../../api/axios";

interface LazyCustomModalProps {
  booked: boolean;
  setBooked: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  eventId: number;
  eventPrice: number;
}

const CustomModal: React.FC<LazyCustomModalProps> = ({
  setBooked,

  handleCloseModal,
  eventId,
  eventPrice,
}) => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const [noOfTickets, setNoOfTickets] = useState(1);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const randomString = uuidv4().replace(/-/g, "").slice(0, 16);

      // Make a POST request to your backend API endpoint
      const response = await axiosPrivate.post(
        "http://localhost:5000/api/v1/booking",
        {
          eventId: eventId,
          numberOfTickets: noOfTickets,
          totalAmount: noOfTickets * eventPrice,
          bookingStatus: "Confirm",
          paymentStatus: "Confirm",
          paymentMethod: "online",
          bookingDateTime: new Date().toISOString(),
          bookingReference: randomString,

          // Generate a random string of 16 characters alphanumeric
        }
      );
      setBooked(true);
      toast.success("Booking Successfull");
      navigate(`/event/${eventId}`);
      handleCloseModal();
      console.log("response", response.data.data.id);

      // Handle the response
      console.log("Response:", response.data);
    } catch (error: any) {
      // Handle any errors
      toast.error(error.response.data.message);
      console.error("Error:", error.response.data.message);
    }
  };

  // const handleLoginClick = () => {
  //   history.push({
  //     pathname: "/login",
  //     state: { data: `events/${eventId}` },
  //   });
  // };
  return (
    <>
      {/* <div
        className="fixed inset-0 bg-black opacity-90"
        onClick={handleCloseModal}
      ></div> */}
      <div className="fixed bg-black rounded-lg top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[58%]  md:w-[60vw] w-[90vw] flex items-center justify-center z-50">
        <div className="bg-surface-200 h-full rounded-lg shadow-inner  shadow-slate-300 w-full ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-white">Book Event</h3>
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
                <form
                  className="w-full flex flex-col items-center justify-center"
                  onSubmit={onSubmit}
                >
                  <div className="datetime flex flex-col gap-3 md:gap-0 md:flex-row justify-start mt-3 sm:w-3/4 w-3/4 ticket sm:py-3  align-middle  ">
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                      <label className="block mb-2 text-sm font-medium text-left text-white">
                        No. Of Tickets
                      </label>
                      <div className="flex gap-1 items-center">
                        <Button
                          onClick={() => {
                            if (noOfTickets > 1) {
                              setNoOfTickets(noOfTickets - 1);
                            }
                          }}
                          className="rounded-full h-7 w-7"
                        >
                          -
                        </Button>
                        <input
                          value={noOfTickets}
                          onChange={(e) =>
                            setNoOfTickets(parseInt(e.target.value))
                          }
                          type="number"
                          disabled
                          className="border sm:text-sm rounded-lg block w-14 h-9 p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-center"
                        />
                        <Button
                          onClick={() => {
                            setNoOfTickets(noOfTickets + 1);
                          }}
                          className="rounded-full h-7 w-7"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                      <label className="block mb-2 text-sm font-medium text-left text-white">
                        Ticket Summary
                      </label>
                      <div className="flex gap-1 items-center">
                        <p className="text-white text-sm ">
                          {noOfTickets} X ₹ {eventPrice}
                        </p>
                        <p>
                          <span className="text-white text-sm font-semibold">
                            = ₹{noOfTickets * eventPrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button className="mt-4" type="submit">
                      Make Payment
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3">
                  {" "}
                  <span>You need to login first </span>
                  <Link to="/login" state={{ from: `event/${eventId}` }}>
                    <Button>Login</Button>{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
