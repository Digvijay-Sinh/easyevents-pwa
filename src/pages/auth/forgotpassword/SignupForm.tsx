import { useState } from "react";
import formbg from "../../../assets/events/formbgfinal.jpg";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import PasswordForm from "./PasswordForm";

const SignupForm = () => {
  const [email, setEmail] = useState("");

  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  const [otpTimerActive, setOtpTimerActive] = useState(false);
  console.log(otpTimerActive);

  return (
    <>
      <section
        style={{ backgroundImage: `url(${formbg})` }}
        className="bg-no-repeat bg-center bg-cover "
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
          <div className="w-full   shadow   md:mt-0 sm:max-w-md xl:p-0 bg-transparent">
            {showOtpScreen === false && showPasswordScreen === false && (
              <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Enter your email for changing password
                </h1>
                <div>
                  <EmailForm
                    setEmail={setEmail}
                    setOtpTimerActive={setOtpTimerActive}
                    setShowOtpScreen={setShowOtpScreen}
                  />
                </div>
              </div>
            )}
            {showOtpScreen === true && showPasswordScreen === false && (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 rounded-3xl">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Enter OTP
                </h1>
                {/* {otpTimerActive && <OTPTimer timerCompleted={timerCompleted} />}{" "} */}
                {/* Conditionally render the OTP timer component */}
                <OtpForm
                  email={email}
                  setShowOtpScreen={setShowOtpScreen}
                  setShowPasswordScreen={setShowPasswordScreen}
                />
              </div>
            )}
            {showOtpScreen === false && showPasswordScreen === true && (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 rounded-3xl">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Enter password
                </h1>
                <div>
                  <PasswordForm
                    email={email}
                    setShowPasswordScreen={setShowPasswordScreen}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
