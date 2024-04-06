import { useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import axios from "axios";
import { axiosPrivate } from "../../api/axios";
import { AuthData, useAuth } from "../../context/AuthProvider";
import { Suspense, lazy, useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SearchBar from "./components/SearchBar";
import toast from "react-hot-toast";
import CategoryCard from "./components/CategoryCard";
import LongEventCard from "./components/LongEventCard";
import { Pagination } from "flowbite-react";

const LazyCustomModal = lazy(() => import("./components/UserInterestModal"));

export interface Category {
  id: number;
  name: string;
  image: string;
}
export interface CategoryWithEvents {
  id: number;
  name: string;
  image: string;
  events: Event[];
}
export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string; // Changed to string to match the provided JSON date format
  end_date: string; // Changed to string to match the provided JSON date format
  start_date_toRegister: string; // Changed to string to match the provided JSON date format
  end_date_toRegister: string; // Changed to string to match the provided JSON date format
  mode: string; // Changed to string to match the provided JSON format
  capacity: number;
  price: number;
  organizer_id: number; // Changed to match the provided JSON format
  venue_id: number; // Changed to match the provided JSON format
  category_id: number; // Changed to match the provided JSON format
  type_id: number; // Changed to match the provided JSON format
  images: Image[]; // Array of Image objects
}

// Interface for the Image object
export interface Image {
  id: number;
  poster_image: string;
  event_id: number;
}

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingPaginated, setIsLoadingPaginated] = useState(false);
  const [categoryWise, setCategoryWise] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [paginatedEvents, setPaginatedEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userInterests, setUserInterests] = useState<CategoryWithEvents[]>([]);
  const [searchedEvents, setSearchedEvents] = useState<Event[]>([]);
  const [categoryWiseEvents, setCategoryWiseEvents] = useState<Event[]>([]);
  const [recommendedBasedOnInterests, setRecommendedBasedOnInterests] =
    useState<Event[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const fetchSearchedAndFilteredEvents = async (apiUrl: string) => {
    try {
      // Make a GET request to fetch categories from the backend
      const response = await axios.get<Event[]>(apiUrl);

      console.log(response.data);

      // Set the fetched categories in the state
      setCategoryWiseEvents(response.data);

      console.log("============categories======");
      console.log(searchedEvents);

      console.log("=========categories==============");
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

  const fetchCategories = async () => {
    try {
      // Make a GET request to fetch categories from the backend
      const response = await axios.get<Category[]>(
        "https://easyeventsbackend-pwa.onrender.com/api/v1/category"
      );

      console.log(response.data);

      // Set the fetched categories in the state
      setCategories(response.data);

      console.log("============categories======");
      console.log(categories);

      console.log("=========categories==============");
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
  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await axios.get(
          "https://easyeventsbackend-pwa.onrender.com/api/v1/events"
        );
        if (res && res.status === 200) {
          console.log("==========res data================");
          console.log(res?.data);

          // setAuth({ email, accessToken });
          // setAuth({
          //   accessToken,
          //   email,
          // });
          setEvents(res.data);
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

    getAllEvents();
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingPaginated(true);
        const response = await axios.get(
          `https://easyeventsbackend-pwa.onrender.com/api/v1/events/paginated?page=${currentPage}`
        );
        const { data, totalCount } = response.data;
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        console.log(totalCount);
        console.log("====================================");
        console.log("====================================");
        setPaginatedEvents(data);
        setTotalPages(totalCount);
      } catch (error) {
        setIsLoadingPaginated(false);
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
    setTimeout(() => {
      setIsLoadingPaginated(false);
    }, 1000); // You can adjust the timeout value as per your needs
  }, [currentPage]);

  useEffect(() => {
    console.log("====================================");
    console.log(userInterests);
    console.log("====================================");
    userInterests.map((category) => {
      setRecommendedBasedOnInterests((prevState) => {
        return [...prevState, ...category.events];
      });
    });

    // userInterests.map((category) => {
    //   // setRecommendedBasedOnInterests((prevState) => {
    //   //   return [
    //   //     ...prevState,
    //   //     ...category.events.filter(
    //   //       (event) => event.category_id === category.id
    //   //     ),
    //   //   ];
    //   // });
    // });
  }, [userInterests]);

  useEffect(() => {
    console.log("====================================");
    console.log(recommendedBasedOnInterests);
    console.log("====================================");
  }, [recommendedBasedOnInterests]);

  const navigate = useNavigate();
  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refreshToken", {
      withCredentials: true,
    });
    if (
      response.status === 403 ||
      response.status === 401 ||
      response.status === 400
    ) {
      navigate("/");
      return null; // Return null or handle the error accordingly
    }
    setAuth((prevAuth: AuthData | null) => ({
      ...prevAuth!,
      accessToken: response.data.accessToken,
      // Include other properties if needed
    }));
    return response.data.accessToken;
  };
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (auth && "accessToken" in auth) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          // Set the expiration time to 20 seconds from the current time

          // Set the cookie with the specified expiration time

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  useEffect(() => {
    setModalOpen(true);

    return () => {
      setModalOpen(false);
    };
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
      className=""
    >
      <Hero />
      <div className="cardContainer   ">
        <div>
          <SearchBar
            isLoadingSearch={isLoadingSearch}
            setIsLoadingSearch={setIsLoadingSearch}
            searchedEvents={searchedEvents}
            setSearchedEvents={setSearchedEvents}
            searched={searched}
            setSearched={setSearched}
          />
        </div>

        {searched && (
          <div className="min-h-44">
            <div className="mt-10">
              <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
                Search Results <br />
              </h1>
            </div>
            {searched && isLoadingSearch && (
              <div className="flex justify-center w-full mt-10">
                <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
              </div>
            )}
            {searched && !isLoadingSearch && (
              <>
                <div className="flex flex-wrap ">
                  {searchedEvents.length > 0 ? (
                    searchedEvents.map((event) => {
                      return (
                        <LongEventCard customKey={event.id} event={event} />
                      );
                    })
                  ) : (
                    <div className="flex justify-center w-full">
                      <h1 className="text-white text-2xl text-center">
                        Oops! No events found
                      </h1>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Popular categories */}
        <div>
          <div className="mt-10">
            <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
              Popular categories <br />
            </h1>
          </div>
          <div>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={true}
              className="flex gap-2"
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                  slidesToSlide: 3,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                  slidesToSlide: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                  slidesToSlide: 2,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {categories?.map((category, index) => {
                console.log(index);

                if (category.image != "") {
                  return (
                    <div
                      onClick={() => {
                        setCategoryWise(category.name);

                        fetchSearchedAndFilteredEvents(
                          `https://easyeventsbackend-pwa.onrender.com/api/v1/events/search?category=${category.id}`
                        );
                      }}
                      className="m-2 cursor-pointer"
                    >
                      <CategoryCard
                        id={category.id}
                        image={category.image}
                        name={category.name}
                      />
                    </div>
                  );
                }
              })}
            </Carousel>
          </div>
        </div>
        {categoryWise != "" && (
          <div>
            <div className="mt-10">
              <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
                Selected {categoryWise} <br />
              </h1>
            </div>

            <div className="flex flex-wrap ">
              {categoryWiseEvents.length > 0 ? (
                categoryWiseEvents.map((event) => {
                  return <LongEventCard customKey={event.id} event={event} />;
                })
              ) : (
                <div className="flex justify-center w-full">
                  <h1 className="text-white text-2xl text-center">
                    Oops! No events found
                  </h1>
                </div>
              )}
            </div>
          </div>
        )}
        {
          <>
            {/* Based on interest */}
            <div>
              <div className="mt-10">
                <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
                  Recommended Events <br />
                  <span className="text sm:text-base text-[0.75rem] text-gray-400">
                    Based on your interests
                  </span>
                </h1>
              </div>
              <div>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlaySpeed={3000}
                  centerMode={true}
                  className="flex gap-2"
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 40,
                      slidesToSlide: 3,
                    },
                    mobile: {
                      breakpoint: {
                        max: 464,
                        min: 0,
                      },
                      items: 1,
                      partialVisibilityGutter: 30,
                      slidesToSlide: 1,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 464,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                      slidesToSlide: 2,
                    },
                  }}
                  rewind={false}
                  rewindWithAnimation={false}
                  rtl={false}
                  shouldResetAutoplay
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  {recommendedBasedOnInterests.length > 0 &&
                    recommendedBasedOnInterests?.map((event, index) => {
                      return (
                        <div className="m-2">
                          <EventCard customKey={index} event={event} />
                        </div>
                      );
                    })}
                  {recommendedBasedOnInterests.length === 0 &&
                    events?.map((event, index) => {
                      return (
                        <div className="m-2">
                          <EventCard customKey={index} event={event} />
                        </div>
                      );
                    })}
                </Carousel>
              </div>
            </div>
            {/* Based on location */}
            <div>
              <div className="mt-10">
                <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
                  Most popular events <br />
                  {/* <span className="text sm:text-base text-[0.75rem] text-gray-400">
                    Based on your location
                  </span> */}
                </h1>
              </div>
              <div>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlaySpeed={3000}
                  centerMode={true}
                  className="flex gap-2"
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 40,
                      slidesToSlide: 3,
                    },
                    mobile: {
                      breakpoint: {
                        max: 464,
                        min: 0,
                      },
                      items: 1,
                      partialVisibilityGutter: 30,
                      slidesToSlide: 1,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 464,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                      slidesToSlide: 2,
                    },
                  }}
                  rewind={false}
                  rewindWithAnimation={false}
                  rtl={false}
                  shouldResetAutoplay
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  {events?.map((event, index) => {
                    return (
                      <div className="m-2">
                        <EventCard customKey={index} event={event} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </>
        }
      </div>
      <div>
        <div className="mt-10">
          <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
            Trending events <br />
            {/* <span className="text sm:text-base text-[0.75rem] text-gray-400">
                    Based on your location
                  </span> */}
          </h1>
        </div>
        {isLoadingPaginated && (
          <div className="flex justify-center w-full min-h-48 mt-10">
            <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
          </div>
        )}

        {!isLoadingPaginated && (
          <div>
            <>
              <div className="flex flex-wrap ">
                {paginatedEvents.length > 0 ? (
                  paginatedEvents.map((event) => {
                    return <LongEventCard customKey={event.id} event={event} />;
                  })
                ) : (
                  <div className="flex justify-center w-full">
                    <h1 className="text-white text-2xl text-center">
                      Oops! No events found
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex overflow-x-auto justify-center sm:justify-center dark">
                <Pagination
                  previousLabel={"<"}
                  nextLabel=">"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </>
          </div>
        )}
      </div>
      {!auth?.accessToken && (
        <div className="">
          <Suspense fallback={<h2>Loading...</h2>}>
            {modalOpen && (
              <div className="fixed inset-0 backdrop-filter backdrop-blur-lg">
                <LazyCustomModal
                  modalOpen={modalOpen}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  categories={categories}
                  setUserInterests={setUserInterests}
                  userInterests={userInterests}
                />
              </div>
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default HomePage;
