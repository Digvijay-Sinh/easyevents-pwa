// import { Route, Routes } from "react-router-dom";
// import AddEventPage from "../pages/addeventpage";
// import Login from "../pages/auth/login";
// import Signup from "../pages/auth/signup";
// import EventBookingPage from "../pages/eventbookingpage";
// import EventGroupPage from "../pages/eventgrouppage";
// import EventPage from "../pages/eventpage";
// import SearchPage from "../pages/searchpage";
// import SuccessPage from "../pages/successpage";
// import HomePage from "../pages/homepage";
// import PrivateRequestPage from "../pages/privateRequestCheck";
// import FormHookTest from "../pages/formHookTest";
// import ProtectedPage from "../pages/protectedpage";
// import CheckBg from "../pages/checkbg";
// import DemoApi from "../pages/demoApi";
// import UserProfilePAge from "../pages/userprofilepage";

// const RouteContainer = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/event/:eventId" element={<EventPage />} />
//         {/* <Route
//           path="/user"
//           element={
//             <ProtectedPage>
//               <UserProfilePAge />
//             </ProtectedPage>
//           }
//         /> */}
//         <Route element={<ProtectedPage />}>
//           {" "}
//           <Route path="/addevent" element={<AddEventPage />} />
//         </Route>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/hookform" element={<FormHookTest />} />
//         <Route path="/eventbooking" element={<EventBookingPage />} />
//         <Route path="/eventgroup" element={<EventGroupPage />} />
//         <Route path="/searchpage" element={<SearchPage />} />
//         <Route path="/private" element={<PrivateRequestPage />} />
//         <Route path="/checkBg" element={<CheckBg />} />
//         <Route path="/demoapi" element={<DemoApi />} />
//         <Route
//           path="/protected"
//           element={
//             <ProtectedPage>
//               <>This is protected content</>
//             </ProtectedPage>
//           }
//         />
//         <Route path="/successpage" element={<SuccessPage />} />{" "}
//       </Routes>
//     </>
//   );
// };

// export default RouteContainer;

import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import EditEventForm from "../pages/editeventpage/EditEventForm";
import EditEventPage from "../pages/editeventpage";
import ForgotPasswordPage from "../pages/auth/forgotpassword";
import EventHostedPage from "../pages/eventhostedpage";

// Lazy-loaded page components
const HomePage = lazy(() => import("../pages/homepage"));
const EventPage = lazy(() => import("../pages/eventpage"));
const AddEventPage = lazy(() => import("../pages/addeventpage"));
const Login = lazy(() => import("../pages/auth/login"));
const Signup = lazy(() => import("../pages/auth/signup"));
const FormHookTest = lazy(() => import("../pages/formHookTest"));
const EventBookingPage = lazy(() => import("../pages/eventbookingpage"));
const EventGroupPage = lazy(() => import("../pages/eventgrouppage"));
const SearchPage = lazy(() => import("../pages/searchpage"));
const PrivateRequestPage = lazy(() => import("../pages/privateRequestCheck"));
const CheckBg = lazy(() => import("../pages/checkbg"));
const DemoApi = lazy(() => import("../pages/demoApi"));
const ProtectedPage = lazy(() => import("../pages/protectedpage"));
const SuccessPage = lazy(() => import("../pages/successpage"));
const UserProfilePAge = lazy(() => import("../pages/userprofilepage"));
const PaymentPage = lazy(() => import("../pages/paymentDemoPage"));

const RouteContainer = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route element={<ProtectedPage />}>
          <Route path="/addevent" element={<AddEventPage />} />
          <Route
            path="/eventhostedpage/:eventId"
            element={<EventHostedPage />}
          />
          <Route path="/editevent/:eventId" element={<EditEventPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/hookform" element={<FormHookTest />} />
        <Route path="/eventbooking" element={<EventBookingPage />} />
        <Route path="/eventgroup" element={<EventGroupPage />} />
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/private" element={<PrivateRequestPage />} />
        <Route path="/checkBg" element={<CheckBg />} />
        <Route path="/demoapi" element={<DemoApi />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* <Route
          path="/protected"
          element={
            <ProtectedPage>
              <>This is protected content</>
            </ProtectedPage>
          }
        /> */}
        <Route path="/successpage" element={<SuccessPage />} />
        <Route path="/user" element={<UserProfilePAge />} />{" "}
        {/* This route doesn't require lazy loading */}
      </Routes>
    </Suspense>
  );
};

export default RouteContainer;
