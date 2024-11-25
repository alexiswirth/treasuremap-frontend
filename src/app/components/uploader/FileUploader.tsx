import React from "react";

interface FileUploaderProps {
  handleFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ handleFileUpload }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          document.getElementById("hiddenFileInput")?.click();
        }}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Charger un fichier
      </button>
      <input
        type="file"
        id="hiddenFileInput"
        style={{ display: "none" }}
        accept=".txt"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FileUploader;
