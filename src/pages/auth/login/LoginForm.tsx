import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import formbg from "../../../assets/events/formbgfinal.jpg";
import { AuthData, useAuth } from "../../../context/AuthProvider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FieldValues, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { state: fromSomewhere } = useLocation();
  const redirectToAgain = fromSomewhere?.from;
  console.log("====================================");
  console.log(redirectToAgain);
  console.log("====================================");
  const state = location.state;
  const redirectTo = state?.from;
  console.log("====================================");
  console.log(state?.from);
  console.log("====================================");
  const loginForm = useForm<FormData>({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const { register, handleSubmit, formState } = loginForm;
  const { errors } = formState;

  const { auth, setAuth } = useAuth();

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { email, password } = data;
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res && res.status === 200) {
        console.log("==========res data================");
        console.log(res?.data);
        console.log("====================================");
        const accessToken = res.data.data.accessToken;
        console.log("===========accessToken=================");
        console.log(accessToken);
        console.log("==========accessToken===============");

        // setAuth({ email, accessToken });
        // setAuth({
        //   accessToken,
        //   email,
        // });
        localStorage.setItem(
          "user",
          JSON.stringify({
            accessToken,
            email,
          })
        );
        setAuth((prevAuth: AuthData) => ({
          ...prevAuth!,
          accessToken: accessToken,
          email: email,
          // Include other properties if needed
        }));
        console.log(auth);

        toast.success("Login successful");

        if (redirectToAgain) {
          navigate(`/${redirectToAgain ? redirectToAgain : ""}`);
          return;
        }

        navigate(`/${redirectTo ? redirectTo : ""}`);

        console.log(JSON.stringify(res?.data));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response && error.response.data) {
          // Handle specific error messages from backend
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          // Other errors
          toast.error("An error occurred");
        }
      } else {
        // Handle non-Axios errors
        toast.error("An error occurred");

        console.error("An error occurred:", error);
      }
      console.log(error);
    }
  };

  return (
    <>
      <section
        style={{ backgroundImage: `url(${formbg})` }}
        className="bg-no-repeat bg-center bg-cover "
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
          <div className="w-full   shadow   md:mt-0 sm:max-w-md xl:p-0 bg-transparent">
            <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Login
              </h1>
              <form
                noValidate
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  <div>
                    {errors.email ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.email.message}
                      </p>
                    ) : (
                      <div style={{ height: "1rem" }} />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    id="password"
                    placeholder="••••••••"
                    className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div>
                    {errors.password ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.password.message}
                      </p>
                    ) : (
                      <div style={{ height: "1rem" }} />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium   hover:underline text-blue-500"
                  >
                    Signup here
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-400">
                  Forgot your password?{" "}
                  <Link
                    to="/forgotpassword"
                    className="font-medium   hover:underline text-blue-500"
                  >
                    Forgot Password
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
