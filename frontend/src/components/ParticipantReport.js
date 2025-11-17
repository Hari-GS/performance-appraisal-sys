import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../helpers/axios_helpers";
import { AiOutlineUser } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { FaBalanceScale, FaHandshake } from "react-icons/fa";

const ParticipantReport = () => {
  const { participantId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(false);

  useEffect(() => {
    fetchParticipantReport();
  }, []);

  const fetchParticipantReport = async () => {
    try {
      const response = await request(
        "GET",
        `/api/reporting/participant/${participantId}`
      );
      setReport(response.data);
    } catch (error) {
      console.error("Failed to fetch participant report:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    setLoadingPdf(true);
    try {
      const response = await request(
        "GET",
        `/api/reporting/participant/${participantId}/download-styled`,
        null,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `AppraisalReport_${report.employeeName}.pdf`
      );
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    } finally {
      setLoadingPdf(false);
    }
  };

  if (loading)
    return <p className="text-center text-black mt-10">Loading report...</p>;

  if (!report)
    return <p className="text-center text-black mt-10">No data found.</p>;

  return (
    <div className="bg-primary text-black min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-800">Report</h2>
          <p className="text-sm text-gray-500">
            — Appraisal Report of the participant
          </p>
        </div>
      </div>

      {/* Participant Details */}
      <div className="bg-primary rounded-xl p-6 m-10 border-2">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <AiOutlineUser className="mr-2 text-accent" />
          {report.employeeName} ({report.employeeId})
        </h2>

        <p className="text-sm mb-1">Designation: {report.designation}</p>
        <p className="text-sm mb-1">Reporting Manager: {report.managerName}</p>
        <p className="text-sm mb-1">
          Appraisal Cycle: {report.appraisalTitle} - {report.appraisalType}
        </p>
      </div>

      {/* Download Button */}
      <div className="flex justify-end pr-10">
        <button
          onClick={downloadPdf}
          className="flex items-center gap-2 bg-accent text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-dark transition mb-6"
          disabled={loadingPdf}
        >
          {loadingPdf ? (
            <>
              <FiDownload className="animate-bounce" size={18} />
              Downloading...
            </>
          ) : (
            <>
              <FiDownload size={18} />
              Download as PDF
            </>
          )}
        </button>
      </div>

      {/* Score Summary Section */}
      <div className="mx-10 mb-8">
        <h3 className="text-accent text-lg font-bold mb-4">Score Summary</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1">
              🟢 Average Self Score
            </p>
            <p className="text-2xl font-bold text-accent">
              {report.averageSelfScore ?? "—"}
            </p>
          </div>

          <div className="bg-white border-2 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1">
              🟡 Average Manager Score
            </p>
            <p className="text-2xl font-bold text-accent">
              {report.averageManagerScore ?? "—"}
            </p>
          </div>

          <div className="bg-white border-2 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1 flex justify-center items-center gap-2">
              <FaBalanceScale className="text-accent" /> Score Difference
            </p>
            <p className="text-2xl font-bold text-accent">
              {report.scoreDifference ?? "—"}
            </p>
          </div>

          <div className="bg-white border-2 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1 flex justify-center items-center gap-2">
              <FaHandshake className="text-accent" /> Agreement %
            </p>
            <p className="text-2xl font-bold text-accent">
              {report.agreementPercentage
                ? `${report.agreementPercentage}%`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mx-10 mb-10">
        <h3 className="text-accent text-lg font-bold mb-4">Review Summary</h3>

        {report.selfReview && report.selfReview.length > 0 ? (
          <div className="space-y-5">
            {report.selfReview.map((self, index) => {
              const manager = report.reportingReview?.[index];
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded border-2 border-gray-200"
                >
                  {/* Question */}
                  <p className="font-semibold text-black mb-2">
                    Q{index + 1}. {self.question}
                  </p>

                  {/* Self Review */}
                  <div className="mb-2">
                    <p className="text-gray-700">
                      🟢 <span className="font-medium">Self Review:</span>{" "}
                      {self.answer || "—"}
                    </p>
                    <p className="text-gray-700 ml-6">
                      <span className="font-medium">Self Score:</span>{" "}
                      <span className="text-accent font-semibold">
                        {self.score ?? "—"}
                      </span>{" "}
                      / 10
                    </p>
                  </div>

                  {/* Manager Review */}
                  <div>
                    <p className="text-gray-700">
                      🟡 <span className="font-medium">Manager Review:</span>{" "}
                      {manager?.answer || "—"}
                    </p>
                    <p className="text-gray-700 ml-6">
                      <span className="font-medium">Manager Score:</span>{" "}
                      <span className="text-accent font-semibold">
                        {manager?.score ?? "—"}
                      </span>{" "}
                      / 10
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">No review data available.</p>
        )}
      </div>
    </div>
  );
};

export default ParticipantReport;
