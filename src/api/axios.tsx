import axios from "axios";
const BASE_URL = "https://easyeventsbackend-pwa.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// const refresh = async () => {
//     const response = await axios.get("/api/v1/auth/refreshToken", {
//       withCredentials: true,
//     });
//     if (
//       response.status === 403 ||
//       response.status === 401 ||
//       response.status === 400
//     ) {
//       navigate("/");
//       return null; // Return null or handle the error accordingly
//     }
//     setAuth((prevAuth: AuthData | null) => ({
//       ...prevAuth!,
//       accessToken: response.data.accessToken,
//       // Include other properties if needed
//     }));
//     return response.data.accessToken;
//   };
// axiosPrivate.interceptors.request.use(
//     (config) => {
//       if (!config.headers["Authorization"]) {
//         if (auth && "accessToken" in auth) {
//           config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
//         }
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   axiosPrivate.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const prevRequest = error?.config;
//       if (error?.response?.status === 403 && !prevRequest?.sent) {
//         prevRequest.sent = true;
//         const newAccessToken = await refresh();
//         const currentTime = new Date();

//         // Set the expiration time to 20 seconds from the current time
//         const expirationTime = new Date(currentTime.getTime() + 20 * 1000); // Add 20 seconds (in milliseconds) to the current time

//         // Set the cookie with the specified expiration time
//         Cookies.set("accessToken", newAccessToken, {
//           expires: expirationTime,
//         });
//         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axiosPrivate(prevRequest);
//       }
//       return Promise.reject(error);
//     }
//   );
