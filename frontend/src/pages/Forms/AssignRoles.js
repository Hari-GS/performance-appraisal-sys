import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import imagePlaceholder from '../../images/profile-placeholder.jpg';
import vector from '../../images/Vector.png';

const AssignRoles = ({ formData, setFormData, onNext }) => {
  const [error, setError] = useState('');

  const [mappingStages, setMappingStages] = useState([
    { label: 'Employee', enabled: true },
    { label: 'Team Leader', enabled: true },
    { label: 'Manager', enabled: !!formData.assignedRoles?.manager?.id },
    { label: 'HR Manager', enabled: !!formData.assignedRoles?.hr?.id },
    { label: 'Final Report to HR', enabled: true },
  ]);

  const handleAssign = (type, participantId, participantName) => {
    setFormData(prev => {
      const currentRole = prev.assignedRoles?.[
        type === 'HR' ? 'hr' :
        type === 'Manager' ? 'manager' :
        'teamLeader'
      ];
  
      const isSamePerson = currentRole?.id === participantId;
  
      return {
        ...prev,
        assignedRoles: {
          ...prev.assignedRoles,
          ...(type === 'HR' && {
            hr: isSamePerson ? { id: null, name: '' } : { id: participantId, name: participantName }
          }),
          ...(type === 'Manager' && {
            manager: isSamePerson ? { id: null, name: '' } : { id: participantId, name: participantName }
          }),
          ...(type === 'TeamLeader' && {
            teamLeader: isSamePerson ? { id: null, name: '' } : { id: participantId, name: participantName }
          }),
        }
      };
    });
  };
  
  const handleToggleStage = (stageLabel, index) => {
    const stage = mappingStages[index];
    const newEnabled = !stage.enabled;
  
    setMappingStages(prev =>
      prev.map((s, i) =>
        i === index ? { ...s, enabled: newEnabled } : s
      )
    );
  
    if (!newEnabled) {
      setFormData(prev => ({
        ...prev,
        assignedRoles: {
          ...prev.assignedRoles,
          ...(stageLabel === 'Manager' && { manager: { id: null, name: '' } }),
          ...(stageLabel === 'HR Manager' && { hr: { id: null, name: '' } }),
        }
      }));
    }
  };
  

  const handleNext = () => {
    const { hr, manager, teamLeader } = formData.assignedRoles;

    const errors = [];
    if (!teamLeader?.id) errors.push('Team Leader must be selected.');

    if (isStageEnabled('Manager') && !manager?.id)
      errors.push('Manager must be selected.');

    if (isStageEnabled('HR Manager') && !hr?.id)
      errors.push('HR Manager must be selected.');

    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    setError('');
    onNext();
  };

  const isStageEnabled = (label) => mappingStages.find(stage => stage.label === label)?.enabled;

  const topRoles = [
    { label: 'Team Leader', roleKey: 'teamLeader' },
    { label: 'Manager', roleKey: 'manager', showIfEnabled: true },
    { label: 'HR Manager', roleKey: 'hr', showIfEnabled: true },
  ];

  const getAppraisalFlowDescription = () => {
    const enabledStages = mappingStages.filter(stage => stage.enabled).map(stage => stage.label);

    if (!enabledStages.includes('Team Leader') || !enabledStages.includes('Final Report to HR')) {
      return 'Please ensure Team Leader is set for a valid appraisal flow.';
    }

    let flow = 'The appraisal starts with the employee.';
    if (enabledStages.includes('Team Leader')) flow += ' Then it moves to the Team Leader for review.';
    if (enabledStages.includes('Manager')) flow += ' After that, the Manager provides feedback.';
    if (enabledStages.includes('HR Manager')) flow += ' Then the HR Manager finalizes the review.';
    if (enabledStages.includes('Final Report to HR')) flow += ' Finally, a report is sent to HR.';

    return flow;
  };

  return (
    <div className="bg-blue-100 p-6 rounded-md space-y-4 shadow-inner">
      <h2 className="text-xl font-bold text-black">Select Participants Roles:</h2>
      <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow-sm">
        <p>{getAppraisalFlowDescription()}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topRoles.map(({ label, roleKey, showIfEnabled }) => {
          if (showIfEnabled && !isStageEnabled(label)) return null;

          const roleData = formData.assignedRoles?.[roleKey];
          const participant = formData.participants.find(p => p.employeeId === roleData?.id);

          return (
            <div key={label} className="bg-white rounded-md p-6 text-center flex flex-col items-center">
              {participant ? (
                <>
                  <img
                    src={participant.avatar || imagePlaceholder}
                    alt={label}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <p className="text-black font-semibold">{participant.name}</p>
                  <p className="text-sm text-gray-600">{label}</p>
                </>
              ) : (
                <>
                  <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 pb-2">
                    +
                  </div>
                  <p className="text-gray-700">Select {label}</p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6 p-4 rounded-md overflow-x-auto gap-4">
        {mappingStages.map((stage, index) => (
          <div key={stage.label} className="flex items-center">
            {index !== 0 && <img className="h-6 pr-4" src={vector} alt="arrow" />}
            <div className="min-h-[75px] min-w-[150px] bg-white px-4 py-3 text-center rounded-lg shadow-inner">
              <p className="text-sm font-semibold text-black mb-2">{stage.label}</p>
              {['Manager', 'HR Manager'].includes(stage.label) && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={stage.enabled}
                    onChange={() => handleToggleStage(stage.label, index)}
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-300 transition-all duration-300"></div>
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transform transition-transform duration-300"></div>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded overflow-y-auto max-h-80 mt-4">
        {formData.participants.map((p) => {
          const { hr, manager, teamLeader } = formData.assignedRoles;
          const assignedIds = [hr?.id, manager?.id, teamLeader?.id];

          return (
            <div key={p.employeeId} className="flex items-center border-b px-4 py-3 justify-between">
              <div className="flex items-center">
                <img
                  src={p.avatar || imagePlaceholder}
                  alt={p.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-black">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.designation}</p>
                </div>
              </div>

              <div className="flex gap-2">

              {/* For HR Button */}
                {isStageEnabled('HR Manager') && (
                  (()=>{
                    const isAssignedElsewhere =
                    (p.employeeId !== hr?.id) &&
                    assignedIds.includes(p.employeeId);
                  return (
                    <button
                    disabled={isAssignedElsewhere}
                    onClick={() => handleAssign('HR', p.employeeId, p.name)}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      hr?.id === p.employeeId
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-pink-600 border-pink-300'
                    } ${
                      isAssignedElsewhere && hr?.id !== p.employeeId
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {hr?.id === p.employeeId ? 'HR ✓' : 'Assign as HR'}
                  </button>
                   ) } )
                  
                ())}

                {/* For Manager Button */}
                {isStageEnabled('Manager') && (()=>{
                  const isAssignedElsewhere =
                  (p.employeeId !== manager?.id) &&
                  assignedIds.includes(p.employeeId);

                  return(
                    <button
                    disabled={isAssignedElsewhere}
                    onClick={() => handleAssign('Manager', p.employeeId, p.name)}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      manager?.id === p.employeeId
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-yellow-600 border-yellow-400'
                    } ${
                      isAssignedElsewhere && manager?.id !== p.employeeId
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {manager?.id === p.employeeId ? 'Manager ✓' : 'Assign as Manager'}
                  </button>
                  )
                }
                )()}

                {/* For Team Leader Button */}
                {(()=>{
                  const isAssignedElsewhere =
                  (p.employeeId !== teamLeader?.id) &&
                  assignedIds.includes(p.employeeId);

                  return(
                    <button
                  disabled={isAssignedElsewhere}
                  onClick={() => handleAssign('TeamLeader', p.employeeId, p.name)}
                  className={`text-xs px-2 py-1 rounded-full border ${
                    teamLeader?.id === p.employeeId
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-purple-600 border-purple-300'
                  } ${
                    isAssignedElsewhere && teamLeader?.id !== p.employeeId
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {teamLeader?.id === p.employeeId ? 'Team Leader ✓' : 'Assign as TL'}
                </button>
                  )
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <div className="w-full flex justify-end mt-4">
        <button
          onClick={handleNext}
          className="bg-accent text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          Next: Create Form <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AssignRoles;
