import React, { useState } from "react";

interface PreviewFileProps {
  file: File;
  width: number;
  height: number;
}

const PreviewFile: React.FC<PreviewFileProps> = ({ file, width, height }) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  function isFileImage(file: File) {
    return file && file.type.split("/")[0] === "image";
  }

  reader.onload = () => {
    setPreview(isFileImage(file) ? (reader.result as string) : "/default.svg");
  };

  return (
    <div className="preview-container">
      <img
        src={preview}
        className="preview"
        alt="Preview"
        width={width}
        height={height}
      />
      <label>{file.name}</label>
    </div>
  );
};

export default PreviewFile;
