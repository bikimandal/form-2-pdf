import React from "react";
import { useLocation } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
// @ts-ignore
import html2pdf from "html2pdf.js";

const Output: React.FC = () => {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500 font-semibold">
          No data found! Please submit the form first.
        </p>
      </div>
    );
  }

  const downloadPDF = () => {
    const button = document.getElementById("download-btn") as HTMLButtonElement;
    if (button) {
      button.disabled = true;
    }

    const element = document.getElementById("pdf-content");
    const options = {
      margin: 1, // Increased margin
      filename: "submitted_information.pdf",
      html2canvas: {
        scale: 2,
        width: 800, // Explicitly set width
        windowWidth: 800, // Match windowWidth
        useCORS: true,
        logging: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    html2pdf()
      .from(element!)
      .set(options)
      .save()
      .then(() => {
        if (button) {
          button.disabled = false;
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        {/* PDF Content Container */}
        <div id="pdf-content" className="bg-white pb-8">
          {" "}
          {/* Added bottom padding */}
          <h3 className="text-4xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-4">
            ID Card
          </h3>
          <div className="flex justify-center mb-6">
            {data.profilePicture && (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(data.profilePicture)}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 shadow-xl mb-4"
                />
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <p className="text-xl text-gray-700">
                <strong>Name:</strong>{" "}
                <span className="font-medium">{data.name}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xl text-gray-700">
                <strong>Class:</strong>{" "}
                <span className="font-medium">{data.className}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xl text-gray-700">
                <strong>Roll Number:</strong>{" "}
                <span className="font-medium">{data.rollNumber}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xl text-gray-700">
                <strong>Contact Number:</strong>{" "}
                <span className="font-medium">{data.contactNumber}</span>
              </p>
            </div>
          </div>
          {/* Footer with adjusted spacing */}
          <div className="mt-12 pt-4 text-center text-gray-600 border-t border-gray-300">
            <p className="text-sm mb-4">&copy; 2024 All Rights Reserved</p>
          </div>
        </div>

        {/* Download button - only visible on webpage */}
        <div className="mt-8 text-center">
          <button
            id="download-btn"
            className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={downloadPDF}
          >
            <FaFileDownload className="mr-2" />
            <span className="text-lg">Download as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Output;
