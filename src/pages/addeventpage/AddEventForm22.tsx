import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { FaCameraRetro } from "react-icons/fa";
import toast from "react-hot-toast";

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
  setEventId: React.Dispatch<React.SetStateAction<number>>;
};

const MAX_IMAGE_SIZE_MB = 1; // Maximum image size allowed in MB
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png"]; // Supported image types

const schema = yup.object().shape({
  speakers: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Speaker Name is required"),
      bio: yup.string().required("Speaker Bio is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Speaker Email is required"),
      organization: yup.string().nullable(), // Assuming organization is optional
      image: yup
        .mixed<FileList>()
        .test(
          "fileSize",
          "Image size should be less than 1MB",
          (value) => !value || (value && value[0].size <= 3 * 1024 * 1024)
        )
        .test(
          "fileType",
          "Only JPEG and PNG images are supported",
          (value) =>
            !value || (value && SUPPORTED_IMAGE_TYPES.includes(value[0].type))
        ),
    })
  ),
});

type FormData = {
  speakers: Array<{
    name: string;
    bio: string;
    email: string;
    organization?: string | null;
    image?: FileList | null;
  }>;
};

const AddEventForm22: React.FC<props> = ({
  eventId,
  setEventId,
  showForm1,
  showForm2,
  showForm3,
  setShowForm4,
  setShowForm1,
  setShowForm2,
  setShowForm3,
  showForm4,
}) => {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [imageError, setImageError] = useState<string | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   setSelectedImage(file);
  //   setImageError(null);

  //   if (file) {
  //     // Validate image type
  //     if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
  //       setImageError("Only JPEG and PNG images are supported.");
  //       return;
  //     }

  //     // Validate image size
  //     if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
  //       setImageError(`Image size should be less than ${MAX_IMAGE_SIZE_MB}MB.`);
  //       return;
  //     }
  //   }
  // };
  const { register, control, handleSubmit, formState, getValues } =
    useForm<FormData>({
      defaultValues: {
        speakers: [
          {
            name: "",
            bio: "",
            email: "",
            organization: "",
            image: null,
          },
        ],
      },
      resolver: yupResolver(schema) as Resolver<FormData>,
    });

  const { errors } = formState;

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // console.log(getValues(`speakers.${0}.image`)?.[0]);

    try {
      // Iterate over each speaker and upload their image
      for (let i = 0; i < data.speakers.length; i++) {
        const speaker = data.speakers[i];
        console.log(speaker);

        // Upload the image for the current speaker
        if (speaker.image) {
          const imageFormData = new FormData();
          imageFormData.append("image", speaker.image[0]);

          const imageUploadResponse = await axios.post(
            "https://easyeventsbackend-pwa.onrender.com/api/v1/imageUpload/upload",
            imageFormData
          );
          toast.success("Image uploaded successfully");
          // Extract the filename of the uploaded image from the response
          const imageUrl = imageUploadResponse.data.data; // Assuming your response structure is { data: filename }
          console.log(imageUrl);

          // Include the image URL in the speaker object
          data.speakers[i].image = imageUrl;
          // log(data.speakers[i].image);
          const formSubmitResponse = await axios.post(
            "https://easyeventsbackend-pwa.onrender.com/api/v1/speakers",
            { eventId: eventId, speakerData: data.speakers[i] }
          );
          toast.success("Speaker added successfully");

          if (formSubmitResponse.status === 200) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(true);
            setShowForm4(false);
          }
          console.log("====================================");
          console.log(formSubmitResponse.data);
          console.log("====================================");
        }

        // Include the image URL in the speaker object
        // data.speakers[i].image = imageUrl;
      }

      // Now, send the form data with updated image URLs to another route

      // Handle response from the backend
      // console.log("Form submission response:", formSubmitResponse.data);

      // Reset the form if necessary
      // reset();
    } catch (error) {
      // Handle errors if any
      console.error("Error:", error);
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "speakers",
    control: control,
  });

  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedImage(event.target.files[0]);
  //   }
  // };
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
  //   } else {
  //     setImageError("Please select an image.");
  //   }
  // };

  return (
    <section className="bg-no-repeat bg-center bg-cover ">
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 "> */}
      <div className="w-full   shadow   md:mt-0 xl:p-0 bg-transparent">
        <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white mt-2">
            Add Speakers /Presenters /Performers
          </h1>
          <div>
            <div>
              <form
                className="space-y-4 md:space-y-6"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  {fields.map((field, index) => {
                    return (
                      <>
                        <div className="sm:flex w-full">
                          <div className="sm:w-1/2 m-4">
                            <div>
                              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                                Speaker no. {index + 1}
                              </h1>
                            </div>
                            <div>
                              {" "}
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker name
                              </label>
                              <input
                                type="text"
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                key={index}
                                {...register(`speakers.${index}.name`)}
                              />
                              <div>
                                {errors.speakers &&
                                errors.speakers[index]?.name ? (
                                  <p className="text-red-500 text-xs italic">
                                    {errors.speakers[index]?.name?.message}
                                  </p>
                                ) : (
                                  <div style={{ height: "1rem" }} />
                                )}
                              </div>{" "}
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker bio
                              </label>
                              <input
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                key={index}
                                {...register(`speakers.${index}.bio`)}
                              />
                              <div>
                                {errors.speakers &&
                                errors.speakers[index]?.bio ? (
                                  <p className="text-red-500 text-xs italic">
                                    {errors.speakers[index]?.bio?.message}
                                  </p>
                                ) : (
                                  <div style={{ height: "1rem" }} />
                                )}
                              </div>{" "}
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker email
                              </label>
                              <input
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                key={index}
                                {...register(`speakers.${index}.email`)}
                              />
                              <div>
                                {errors.speakers &&
                                errors.speakers[index]?.email ? (
                                  <p className="text-red-500 text-xs italic">
                                    {errors.speakers[index]?.email?.message}
                                  </p>
                                ) : (
                                  <div style={{ height: "1rem" }} />
                                )}
                              </div>{" "}
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-white">
                                Speaker organization
                              </label>
                              <input
                                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                key={index}
                                {...register(`speakers.${index}.organization`)}
                              />
                              <div>
                                {errors.speakers &&
                                errors.speakers[index]?.organization ? (
                                  <p className="text-red-500 text-xs italic">
                                    {
                                      errors.speakers[index]?.organization
                                        ?.message
                                    }
                                  </p>
                                ) : (
                                  <div style={{ height: "1rem" }} />
                                )}
                              </div>{" "}
                            </div>
                          </div>
                          <div className="sm:w-1/2   m-4 sm:self-center sm:flex sm:flex-col sm:items-center  ">
                            <div className="sm:w-1/2">
                              <label className="block relative mb-2 text-sm font-medium text-white sm:flex sm:flex-col sm:items-center">
                                Speaker Image
                                <div className="flex items-center justify-center sm:h-36 sm:w-36 border-2 border-dashed border-gray-600 rounded-lg">
                                  <input
                                    className=" opacity-1 cursor-pointer"
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    {...register(`speakers.${index}.image`)}

                                    // onChange={handleFileChange}
                                  />
                                  <div>
                                    {errors.speakers &&
                                    errors.speakers[index]?.image ? (
                                      <p className="text-red-500 text-xs italic">
                                        {errors.speakers[index]?.image?.message}
                                      </p>
                                    ) : (
                                      <div style={{ height: "1rem" }} />
                                    )}
                                  </div>{" "}
                                </div>
                                {/* <div className="flex items-center justify-center sm:h-36 sm:w-36 border-2 border-dashed border-gray-600 rounded-lg">
                                  <FaCameraRetro className="text-5xl text-white" />
                                </div> */}
                              </label>
                            </div>
                            <div>
                              {/* <span className="block relative mb-2 text-sm font-medium text-white sm:flex sm:flex-col sm:items-center">
                                <p className="text-white mt-2">
                                  {getValues(`speakers.${index}.image`) ?  getValues(`speakers.${index}.image`)[0].name:""}
                                </p>
                              </span> */}
                            </div>
                            {/* <Button onClick={uploadSpeakerImage}>
                              Upload Image
                            </Button> */}
                          </div>
                        </div>
                        {index > 0 && (
                          <Button
                            className="mt-2"
                            type="button"
                            onClick={() => {
                              return remove(index);
                            }}
                          >
                            Remove speaker
                          </Button>
                        )}
                      </>
                    );
                  })}
                  <Button
                    className="mt-2"
                    type="button"
                    onClick={() => {
                      return append({
                        name: "",
                        bio: "",
                        email: "",
                        organization: "",
                      });
                    }}
                  >
                    Add new Speaker
                  </Button>
                </div>

                <div className="w-full flex justify-end ">
                  <Button className="m-4" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default AddEventForm22;
