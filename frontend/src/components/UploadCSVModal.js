import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudArrowUp, BsX, BsFileEarmarkText } from "react-icons/bs";
import { request } from "../helpers/axios_helpers";

const UploadCSVModal = ({ onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (selected && selected.type === "text/csv" && selected.size <= 2 * 1024 * 1024) {
      setFile(selected);
      setMessage({ text: "", type: "" });
    } else {
      setMessage({ text: "Please select a valid CSV file (max 2MB).", type: "error" });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "text/csv": [".csv"] },
    maxSize: 2 * 1024 * 1024,
  });

  const handleUpload = async () => {
    if (!file) {
      setMessage({ text: "No file selected.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const response = await request("POST", "/employees/upload", formData);
      let resText = typeof response === "string"
        ? response
        : response?.data || "Upload completed.";

      let msgType = "success";

      if (/duplicate|skipped|warning/i.test(resText)) {
        msgType = "warning";
        resText = "Duplicates found and skipped.";
      } else if (/fail|error/i.test(resText)) {
        msgType = "error";
      }

      setMessage({ text: resText, type: msgType });

      if (msgType === "success") {
        // onUploadSuccess();
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      }

    } catch (err) {
      const errMsg = err?.response?.data || "Upload failed. Check CSV format.";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const getColor = () => {
    switch (message.type) {
      case "success": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "error":
      default: return "text-red-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <BsX size={22} />
        </button>

        <div className="flex items-center mb-4">
          <BsFileEarmarkText className="text-4xl mr-2 text-orange-400" />
          <h2 className="text-2xl font-semibold">Upload File</h2>
        </div>

        <p className="text-sm text-gray-600 mb-2">Attach the file below</p>
        <div className="mb-4">
          <p className="text-sm text-gray-800 font-medium mb-1">⚠️ Please upload your employee CSV in the following format:</p>
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full border border-gray-300 text-left bg-white shadow-sm">
              <thead className="bg-orange-100">
                <tr>
                  <th className="border px-2 py-1">firstName</th>
                  <th className="border px-2 py-1">lastName</th>
                  <th className="border px-2 py-1">designation</th>
                  <th className="border px-2 py-1">employeeId</th>
                  <th className="border px-2 py-1">userId</th>
                  <th className="border px-2 py-1">password</th>
                  <th className="border px-2 py-1">emailId</th>
                  <th className="border px-2 py-1">roleInTheHierarchy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">John</td>
                  <td className="border px-2 py-1">Doe</td>
                  <td className="border px-2 py-1">Tester</td>
                  <td className="border px-2 py-1">EMP1</td>
                  <td className="border px-2 py-1">john.doe</td>
                  <td className="border px-2 py-1">pass12345</td>
                  <td className="border px-2 py-1">johndoe02@gmail.com</td>
                  <td className="border px-2 py-1">Team Member</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-orange-500 bg-orange-50" : "border-orange-300 bg-orange-100 hover:bg-orange-50"
          } mb-4`}
        >
          <input {...getInputProps()} />
          <BsCloudArrowUp className="text-orange-500 text-4xl mb-2 mx-auto" />
          <p className="text-gray-600 text-sm">
            Drag and drop CSV file here, or click to select file
          </p>
          <p className="text-xs text-blue-600 mt-1 underline">Max file size: 2MB</p>
        </div>

        {file && (
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-3 mb-4 shadow-sm">
            <div className="flex items-center gap-2">
              <BsFileEarmarkText className="text-green-600" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-gray-500 hover:text-red-500"
            >
              <BsX />
            </button>
          </div>
        )}

        {message.text && (
          <p className={`text-sm mb-3 ${getColor()}`}>{message.text}</p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCSVModal;
