import React from 'react';

const CustomNode = ({ nodeDatum }) => {
  const { name, attributes } = nodeDatum;
  const role = attributes?.role || 'Unknown Role';
  const employeeId = attributes?.employeeId || 'ID: N/A';
  const imageUrl = attributes?.imageUrl || 'https://via.placeholder.com/50';

  return (
    <g>
      <rect
        width="200"
        height="100"
        x="-90"
        y="-40"
        rx="10"
        ry="10"
        fill="#D7E7FF"
      />
      <image
        href={imageUrl}
        x="-80"
        y="-30"
        height="50"
        width="50"
        clipPath="circle(25px at center)"
      />
      <text fill="#001D4B" fontSize="14"  x="-20" y="-10">
        {name}
      </text>
      <text fill="#FF9500" fontSize="12" x="-20" y="10">
        {role}
      </text>
      <text fill="#001D4B" fontSize="10" x="-20" y="25">
        {employeeId}
      </text>
    </g>
  );
};

export default CustomNode;
