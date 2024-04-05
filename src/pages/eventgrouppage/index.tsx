import { useNavigate } from "react-router-dom";

const EventGroupPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      EventGroupPage
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/");
          }}
        >
          Home page
        </button>
      </div>
    </div>
  );
};

export default EventGroupPage;
