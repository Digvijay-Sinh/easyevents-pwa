import { Suspense, lazy, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Button } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
const LazyCustomModal = lazy(() => import("./AddEventModel"));

const Nav = () => {
  const { auth, setAuth } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const logouthandler = () => {
    setAuth({
      accessToken: "",
      email: "",
    });
    localStorage.removeItem("user");
  };

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <header className="z-50">
        <div
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 999,
          }}
          className="px-4 py-2 text-white flex   justify-between bg-black"
        >
          <div className="flex mt-2 sm:mt-0 items-start sm:items-center justify-center">
            <Link to="/">
              <h1 className="font-custom font-extrabold text-2xl align-middle">
                easyevents
              </h1>
            </Link>
          </div>
          <div
            className={
              toggleMenu
                ? "md:flex  md:pt-0 pt-10 w-full md:w-auto"
                : "hidden md:flex"
            }
            id="menu"
          >
            <ul>
              <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
                <NavLink
                  to="/"
                  className="md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3"
                >
                  Home
                </NavLink>
              </li>

              {!auth?.accessToken ? (
                <>
                  <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
                    <NavLink
                      to="/signup"
                      className="md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3"
                    >
                      Signup
                    </NavLink>
                  </li>

                  <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
                    <NavLink
                      to="/login"
                      className="md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
                    <NavLink
                      to="/user"
                      className="md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
                    <NavLink
                      to="/login"
                      onClick={logouthandler}
                      className="md:inline-block cursor-pointer hover:text-gray-500  md:border-none py-2 px-3"
                    >
                      Log out
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="flex ">
            {!toggleMenu && (
              <div className="flex items-center">
                <Button
                  className="p-0 mx-auto mt-2 focus:z-0"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <IoMdAdd /> Add event{" "}
                </Button>
                {/* <Link to="/addevent">
                </Link> */}
              </div>
            )}
            <div className="cursor-pointer md:hidden">
              <input
                className="menu-btn hidden"
                type="checkbox"
                id="menu-btn"
              />
              <label
                className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
                htmlFor="menu-btn"
              >
                <span
                  onClick={handleToggle}
                  className="navicon bg-white-darkest flex items-center relative"
                ></span>
              </label>
            </div>
          </div>
          <div className={`${!modalOpen && "hidden"}`}>
            <Suspense fallback={<h2>Loading...</h2>}>
              {modalOpen && (
                <div className="fixed inset-0 backdrop-filter backdrop-blur-lg">
                  <LazyCustomModal
                    modalOpen={modalOpen}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                  />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </header>
      <></>
    </>
  );
};

export default Nav;
