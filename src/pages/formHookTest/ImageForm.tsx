import React, { useState } from "react";
import axios from "axios";

const ImageForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const imageUpload = await axios.post(
        "http://localhost:5000/api/v1/imageUpload/upload",
        formData
      );
      if (imageUpload.status === 200) {
        setSelectedImage(null);
        const fileInput = document.getElementById(
          "imageInput"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ""; // Clear the input value
        }
      }
      console.log("===========uploaded successfully===============");
      console.log(imageUpload.data);
      console.log("====================================");
    }
  };

  //   const handleSubmit = async () => {
  //     if (selectedImage) {
  //       const formData = new FormData();
  //       formData.append("image", selectedImage);
  //       const imageUpload = await axios.post(
  //         "http://localhost:5000/api/v1/imageUpload/upload",
  //         formData
  //       );
  //       if (imageUpload.status === 200) {
  //         setSelectedImage(null);
  //       }
  //       console.log("===========uploaded successfully===============");
  //       console.log(imageUpload.data);
  //       console.log("====================================");
  //       // fetch('/upload', {
  //       //     method: 'POST',
  //       //     body: formData,
  //       // })
  //       //     .then(response => {
  //       //         // Handle response
  //       //     })
  //       //     .catch(error => {
  //       //         // Handle error
  //       //     });
  //     }
  //   };

  return (
    <div className="mt-9">
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ImageForm;
