import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

const FileUpload = ({
  accept = "image/*",
  onChange,
  index,
  onBannerChange,
  value,
  preview = true,
  className = "",
}) => {
  const [previewUrl, setPreviewUrl] = useState(
    typeof value === "string" ? value : null
  );
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    onChange && onChange(file);
    onBannerChange && onBannerChange(index, file);
    if (file && preview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith(accept.replace("/*", ""))) {
      onChange(file);
      if (preview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearFile = () => {
    onChange(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl && preview ? (
          <div className="relative w-full">
            {accept.startsWith("image/") || accept === "image/*" ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 mx-auto rounded"
              />
            ) : accept.startsWith("video/") || accept === "video/*" ? (
              <video
                src={previewUrl}
                controls
                className="max-h-48 mx-auto rounded"
              />
            ) : null}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop a file here, or click to select a file
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {accept.replace("/*", " files")}
            </p>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
