import React, { Suspense } from "react";
import Loader from "../components/Loader";

const LazyNavbar = React.lazy(() => import("../components/Navbar"));
const LazyRouteContainer = React.lazy(() => import("../routes/Route"));
const LazyFooter = React.lazy(() => import("../components/Footer"));

const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LazyNavbar />
      <div className="pt-12 min-h-screen">
        <LazyRouteContainer />
      </div>
      <LazyFooter />
    </Suspense>
  );
};

export default Layout;
