import React, { useState } from "react";

const MAX_IMAGE_SIZE_MB = 1; // Maximum image size allowed in MB
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png"]; // Supported image types

const CheckImageValidationUsingState: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file);
    setImageError(null);

    if (file) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedImage) {
      // Handle form submission here
      console.log("Form submitted with image:", selectedImage);
    } else {
      setImageError("Please select an image.");
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          style={{ maxWidth: "100px" }}
        />
      )}
      {imageError && <div>{imageError}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckImageValidationUsingState;
