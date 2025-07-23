import { FaCheckCircle } from 'react-icons/fa';

const StepperTabs = ({ currentStep, setCurrentStep, validatedSteps }) => {
  const steps = ['Basic Info', 'Participants', 'Roles Mapping', 'Questions', 'Preview'];

  const handleStepClick = (index) => {
    if (index <= currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="w-full space-y-2">
      <h2 className="text-xl font-semibold">Create Appraisal Cycle</h2>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#082148] rounded-full relative">
        <div
          className="h-2 bg-orange-400 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-xs md:text-sm font-medium text-black mt-1">
        {steps.map((step, index) => {
          const isCompleted = validatedSteps.includes(index);
          const isActive = index === currentStep;

          return (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              disabled={index > currentStep} // Prevent forward navigation
              className={`flex items-center gap-1 transition ${
                isCompleted
                  ? 'text-green-600 hover:text-green-700'
                  : isActive
                  ? 'text-orange-600 font-semibold text-base'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              {isCompleted && <FaCheckCircle className="text-green-500" />}
              <span>{step}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepperTabs;
