import React, { useState, useEffect } from "react";
interface Props {
  timerCompleted: () => void;
}
const OTPTimer: React.FC<Props> = ({ timerCompleted }) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );

      return () => clearInterval(timer);
    }
    if (counter === 0) {
      timerCompleted();
    }
  }, [counter]);

  return (
    <div>
      <p className="text-white">Time Left: {counter}</p>
    </div>
  );
};

export default OTPTimer;
