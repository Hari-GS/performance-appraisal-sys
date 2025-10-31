import React, { useState, useEffect } from "react";
import StepperTabs from "./StepperTabs";
import BasicInfoForm from "./BasicInfoForm";
import AppraisalParticipants from "./AppraisalParticipants";
import TemplateMapper from "./TemplateMapper";
import AppraisalPreview2 from "./AppraisalPreview2";
import { request } from "../../helpers/axios_helpers";

const CreateAppraisalFormPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validatedSteps, setValidatedSteps] = useState([]);
  const [formData, setFormData] = useState({
    basicInfo: {
      title: "",
      type: "",
      startDate: "",
      selfAppraisalEndDate: "",
      endDate: "",
      description: "",
    },
    participants: [],
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 🔍 Check for templates and participants on load
  useEffect(() => {
    const checkDataAvailability = async () => {
      try {
        const [templatesRes, participantsRes] = await Promise.all([
          request("GET", "/api/templates"), // adjust to your backend
          request("GET", "/api/new-employees/summary"),
        ]);

        const templateCount = templatesRes.data.length;
        const participantCount = participantsRes.data.length;

        if (templateCount === 0 && participantCount === 0) {
          setModalMessage(
            "No templates and participants found. Please create at least one template and add participants before creating an appraisal form."
          );
          setShowModal(true);
        } else if (templateCount === 0) {
          setModalMessage(
            "No templates found. Please create at least one template before creating an appraisal form."
          );
          setShowModal(true);
        } else if (participantCount === 0) {
          setModalMessage(
            "No participants found. Please add participants before creating an appraisal form."
          );
          setShowModal(true);
        }
      } catch (error) {
        setModalMessage("Failed to fetch templates or participants. Please try again.");
        setShowModal(true);
      }
    };

    checkDataAvailability();
  }, []);

  const handleNext = () => {
    setValidatedSteps((prev) => [...new Set([...prev, currentStep])]);
    setCurrentStep((prev) => prev + 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoForm
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <AppraisalParticipants
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <TemplateMapper
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <AppraisalPreview2
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <StepperTabs
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        validatedSteps={validatedSteps}
      />
      <div className="p-6">{renderStepContent()}</div>

      {/* 🚨 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Attention Required
            </h2>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition"
            >
              OK, Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAppraisalFormPage;
