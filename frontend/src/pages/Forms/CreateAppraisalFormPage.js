import React, { useState } from 'react';
import StepperTabs from './StepperTabs';
import BasicInfoForm from './BasicInfoForm';
import AppraisalParticipants from './AppraisalParticipants';
import AssignRoles from './AssignRoles';
import FormCreation from './FormCreation';
import AppraisalPreview from './AppraisalPreview';
import TemplateMapper from './TemplateMapper';
import AppraisalPreview2 from './AppraisalPreview2';

const CreateAppraisalFormPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validatedSteps, setValidatedSteps] = useState([]);

  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      type: '',
      startDate: '',
      selfAppraisalEndDate:'',
      endDate: '',
      description: '',
    },
    participants: [] // each should include employeeId, employeeName, and questions
  });
  

  const handleNext = () => {
    setValidatedSteps(prev => [...new Set([...prev, currentStep])]);
    setCurrentStep(prev => prev + 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <BasicInfoForm formData={formData} setFormData={setFormData} onNext={handleNext}/>;
      case 1: return <AppraisalParticipants formData={formData} setFormData={setFormData} onNext={handleNext}/>
      case 2: return <TemplateMapper formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 3: return <AppraisalPreview2 formData={formData} setFormData={setFormData} onNext={handleNext}/>;
      // case 4: return <AppraisalPreview formData={formData}/>;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <StepperTabs currentStep={currentStep} setCurrentStep={setCurrentStep} validatedSteps={validatedSteps}/>
      <div className="p-6">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default CreateAppraisalFormPage;
