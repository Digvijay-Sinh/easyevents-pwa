// import axios from "axios";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { FaCameraRetro } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Event } from "../eventpage";
import { axiosPrivate } from "../../api/axios";

const MAX_IMAGE_SIZE_MB = 1; // Maximum image size allowed in MB
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png"]; // Supported image types

type props = {
  showForm1: boolean;
  setShowForm1: React.Dispatch<React.SetStateAction<boolean>>;
  showForm2: boolean;
  setShowForm2: React.Dispatch<React.SetStateAction<boolean>>;
  showForm3: boolean;
  setShowForm3: React.Dispatch<React.SetStateAction<boolean>>;
  showForm4: boolean;
  setShowForm4: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: number;
  event: Event;
};

const EditEventForm3: React.FC<props> = ({
  eventId,
  event,
  showForm1,
  showForm2,
  showForm3,
  setShowForm4,
  setShowForm1,
  setShowForm2,
  setShowForm3,
  showForm4,
}) => {
  // const { register, control, handleSubmit, formState } = useForm<FormData>({
  //   defaultValues: {
  //     speakers: [
  //       {
  //         name: "",
  //         bio: "",
  //         email: "",
  //         organization: "",
  //       },
  //     ],
  //   },
  //   resolver: yupResolver(schema) as Resolver<FormData>,
  // });

  // const { errors } = formState;

  // const onSubmit = (data: FormData) => {
  //   // Handle form submission
  //   console.log(data);
  // };

  // const { fields, append, remove } = useFieldArray({
  //   name: "speakers",
  //   control: control,
  // });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    setSelectedImage(file);
    setImageError(null);

    if (file) {
      console.log(file);

      // Validate image type
      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        setImageError("Only JPEG and PNG images are supported.");
        return;
      }

      // Validate image size
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        setImageError(`Image size should be less than ${MAX_IMAGE_SIZE_MB}MB.`);
        return;
      }
    }
  };

  const onSubmit = async () => {
    try {
      if (imageError) {
        toast.error("Please fix the image error before uploading");
        return;
      }
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.post(
          "https://easyeventsbackend-pwa.onrender.com/api/v1/imageUpload/upload",
          formData
        );
        toast.success("Image uploaded successfully");
        // Handle response from the server if needed
        console.log("Upload successful:", response.data);

        const uploadedFileName = response.data.data;
        const formSubmitResponse = await axiosPrivate.put(
          "https://easyeventsbackend-pwa.onrender.com/api/v1/posterImage",
          { eventId: event.id, filename: uploadedFileName }
        );
        toast.success("Poster image added successfully");
        if (formSubmitResponse.status === 200) {
          console.log("===========uploaded successfully===============");
          console.log(formSubmitResponse.data);
          console.log("====================================");

          // setShowForm4(true);
        }
      } else {
        // Handle case where no image is selected
        console.error("No image selected");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error uploading image:", error);
    }
    // Handle form submission
  };
  // const uploadSpeakerImage = async () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append("image", selectedImage);
  //     const imageUpload = await axios.post(
  //       "https://easyeventsbackend-pwa.onrender.com/api/v1/imageUpload/upload",
  //       formData
  //     );
  //     if (imageUpload.status === 200) {
  //       setSelectedImage(null);
  //       const fileInput = document.getElementById(
  //         "imageInput"
  //       ) as HTMLInputElement;
  //       if (fileInput) {
  //         fileInput.value = ""; // Clear the input value
  //       }
  //     }
  //     console.log("===========uploaded successfully===============");
  //     console.log(imageUpload.data);
  //     console.log("====================================");
  //   }
  // };

  return (
    <section className="bg-no-repeat bg-center bg-cover min-h-[90vh]">
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 "> */}
      <div className="w-full   shadow   md:mt-0 xl:p-0 bg-transparent">
        <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white mt-2">
            Add Poster Images
          </h1>
          <div>
            <div>
              <div className="sm:w-1/2   m-4 sm:self-center sm:flex sm:w-full sm:items-center  ">
                <div className="sm:w-1/2 ">
                  <label className="block relative mb-2 text-sm font-medium text-white sm:flex sm:flex-col sm:items-center">
                    Poster Image
                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="flex items-center justify-center sm:h-36 sm:w-36 border-2 border-dashed border-gray-600 rounded-lg">
                      <FaCameraRetro className="text-5xl text-white" />
                    </div>
                  </label>
                  <Button className="mx-auto my-0" onClick={onSubmit}>
                    Upload Image
                  </Button>
                </div>
                <div>
                  <div className="mt-4">
                    {selectedImage && (
                      <img
                        className="align-middle"
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        style={{ width: "320px", height: "180px" }}
                      />
                    )}
                  </div>
                  {imageError && <div className="text-white">{imageError}</div>}
                  <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white mt-2">
                    Old Image
                  </h1>
                  <div className="mt-4">
                    <img
                      className="align-middle"
                      src={`https://easyeventsbackend-pwa.onrender.com/uploads/${event?.images[0]?.poster_image}`}
                      alt="Selected"
                      style={{ width: "320px", height: "180px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button
          onClick={() => {
            toast.success("Event added successfully");
            navigate("/");
          }}
        >
          Publish your event
        </Button>
      </div>
      {/* </div> */}
    </section>
  );
};

export default EditEventForm3;
