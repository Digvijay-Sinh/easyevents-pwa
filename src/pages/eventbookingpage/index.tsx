import { useNavigate } from "react-router-dom";

const EventBookingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      EventBookingPage
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/eventgroup");
          }}
        >
          Make payment
        </button>
      </div>
    </div>
  );
};

export default EventBookingPage;
