const stageDisplayMap = {
  CREATED: 'Created',
  SELF_REVIEW: 'Self Review',
  REPORTING_REVIEW: 'Reporting Person Review',
  HR_REVIEW: 'HR Review',
  CLOSED: 'Closed',
};


const stages = ['CREATED', 'SELF_REVIEW', 'REPORTING_REVIEW', 'HR_REVIEW', 'CLOSED'];

  const ProgressBar = ({ currentStage }) => {
    const currentIndex = stages.indexOf(currentStage);
    const progressPercentage =
      currentIndex >= 0 && stages.length > 1
        ? (currentIndex / (stages.length - 1)) * 100
        : 0;
  
    return (
      <div className="w-full relative">
        {/* Labels */}
        <div className="relative mb-3 h-5">
          {stages.map((stage, idx) => (
            <span
              key={idx}
              className={`
                absolute text-xs font-medium whitespace-nowrap
                ${idx === currentIndex ? 'text-[#FF9500]' : idx < currentIndex ? 'text-black' : 'text-gray-400'}
              `}
              style={{
                left:
                  idx === 0
                    ? '0%'
                    : idx === stages.length - 1
                    ? '100%'
                    : `${(idx / (stages.length - 1)) * 100}%`,
                transform:
                  idx === 0
                    ? 'translateX(0%)'
                    : idx === stages.length - 1
                    ? 'translateX(-100%)'
                    : 'translateX(-50%)',
              }}
            >
              {stageDisplayMap[stage] || stage}
            </span>
          ))}
        </div>
  
        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-300 rounded-full mb-6">
          {/* Filled progress */}
          <div
            className="absolute h-full bg-[#FF9500] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
  
          {/* Stage Dots */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2 px-[2px]">
            {stages.map((_, idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 z-10
                  ${idx === currentIndex
                    ? 'bg-[#FF9500] border-[#FF9500]'
                    : idx < currentIndex
                    ? 'bg-[#FF9500] border-[#FF9500]'
                    : 'bg-white border-gray-300'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  