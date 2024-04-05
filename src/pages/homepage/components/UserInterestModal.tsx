import { Button } from "flowbite-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
// import { v4 as uuidv4 } from "uuid";
// import { axiosPrivate } from "../api/axios";
// import { useHistory } from "react-router-dom";
import { Category, CategoryWithEvents } from "../index";
import { useEffect, useState } from "react";
interface LazyCustomModalProps {
  modalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  userInterests: CategoryWithEvents[];
  categories: Category[];
  setUserInterests: React.Dispatch<React.SetStateAction<CategoryWithEvents[]>>;
}

const AddEventModel: React.FC<LazyCustomModalProps> = ({
  handleCloseModal,
  setUserInterests,
  categories,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  useEffect(() => {
    console.log(selectedInterests);
  }, [selectedInterests]);

  const toggleInterest = (categoryId: number) => {
    console.log("====================================");
    console.log(selectedInterests);
    console.log("====================================");
    if (selectedInterests.includes(categoryId)) {
      setSelectedInterests(
        selectedInterests.filter((interest) => interest !== categoryId)
      );
    } else {
      setSelectedInterests([...selectedInterests, categoryId]);
    }
  };

  const handleInterestSelection = () => {
    const selectedCategories = selectedInterests.map((interestId) =>
      categories.find((category) => category.id === interestId)
    );
    setUserInterests(selectedCategories as CategoryWithEvents[]);

    handleCloseModal();
  };
  return (
    <>
      {/* <div
        className="fixed inset-0 bg-black opacity-90"
        onClick={handleCloseModal}
      ></div> */}
      <div className="fixed bg-black rounded-lg top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[58%]  md:w-[60vw] w-[90vw] flex items-center justify-center z-50">
        <div className="bg-surface-200 h-full rounded-lg shadow-inner  shadow-slate-300 w-full ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-white">
              Select Your Interests
            </h3>
            <button
              type="button"
              className="text-gray-200 bg-transparent hover:bg-purple-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="p-4 md:p-5 text-white">
            {/* main content */}
            <div className="flex w-full flex-col items-center gap-3 justify-center">
              <div className="datetime flex flex-wrap gap-2 items-center mt-2 border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
                {categories.map((category) => {
                  return (
                    <Button
                      onClick={() => toggleInterest(category.id)}
                      key={category.id}
                      className={`p-0 mx-auto rounded-full  focus:ring-0 
                      
                    
                      ${
                        selectedInterests.includes(category.id)
                          ? "bg-purple-600 enabled:hover:bg-purple-600 "
                          : "bg-purple-400 enabled:hover:bg-purple-400 "
                      }`}
                    >
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full justify-end mr-4">
              <Button onClick={handleInterestSelection} className="mr-12 mt-3">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventModel;
