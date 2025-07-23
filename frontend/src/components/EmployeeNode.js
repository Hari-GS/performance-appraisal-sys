import React from 'react';
import { Handle, Position } from 'reactflow';
import dp from '../images/dp-default-preview.png'

export default function EmployeeNode({ data }) {
  const { imageUrl, name, role } = data;

  return (
    <div className="bg-[#D7E7FF] border-2 border-[#001D4B] rounded-xl p-2 w-36 text-center shadow-md font-sans relative">
      {/* Incoming connections */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-[#001D4B]" />
      
      <img
        src={dp}
        alt={name}
        className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
      />
      <div className="font-bold text-[#001D4B] text-sm">{name}</div>
      <div className="text-[#FF9500] text-xs">{role}</div>

      {/* Outgoing connections */}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-[#001D4B]" />
    </div>
  );
}
