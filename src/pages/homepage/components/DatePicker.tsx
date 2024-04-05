import Datepicker from "react-tailwindcss-datepicker";
// import "react-tailwindcss-datepicker/src/index.css";
interface DateRangeState {
  startDate: string;
  endDate: string;
}
interface props {
  value: DateRangeState;
  handleValueChange: (newValue: DateRangeState) => void;
  placeholder: string;
}

const DarkModeDatepicker = ({
  value,
  handleValueChange,
  placeholder,
}: props) => {
  // setDarkMode(true);

  return (
    <div className="dark">
      {/* <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button> */}
      <Datepicker
        useRange={false}
        placeholder={placeholder}
        primaryColor="purple"
        value={{
          startDate: value.startDate,
          endDate: new Date(value.endDate),
        }}
        onChange={() => {
          handleValueChange(value);
        }}
      />
    </div>
  );
};

export default DarkModeDatepicker;
