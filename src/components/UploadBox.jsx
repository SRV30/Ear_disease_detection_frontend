import { useState, useRef } from "react";

export default function UploadBox({ onFileSelect }) {
  const [fileName, setFileName] = useState("");
  const dropRef = useRef(null);

  const handleFile = (file) => {
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("ring-4", "ring-indigo-300");
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("ring-4", "ring-indigo-300");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("ring-4", "ring-indigo-300");
  };

  return (
    <div
      ref={dropRef}
      onClick={() => document.getElementById("fileInput").click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="bg-white border-2 border-dashed border-indigo-300 rounded-3xl p-7 text-center cursor-pointer 
                 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md select-none"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/1048/1048327.png"
        alt="upload"
        className="w-14 mx-auto mb-3 opacity-90"
      />

      {!fileName && (
        <>
          <p className="text-slate-700 font-medium text-sm mb-1">
            Drag & Drop or Click to Upload Ear Image
          </p>
          <p className="text-[11px] text-slate-400 mb-1">
            .jpg · .jpeg · .png · .gif supported
          </p>
        </>
      )}

      {fileName && (
        <p className="text-sm font-semibold text-indigo-700 animate-fade">
          {fileName.slice(0, 28)}{fileName.length > 28 ? "..." : ""}
        </p>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <style>
        {`
          .animate-fade {
            animation: fadeIn 0.35s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity:0; transform: translateY(2px); }
            to   { opacity:1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
