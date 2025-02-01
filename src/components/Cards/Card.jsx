import React from 'react';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ContentCard = ({ icon, numberValue, contentName, color }) => {
  const IconComponent = Icons[icon];
  const navigate = useNavigate(); 

  return (
    <div 
      className="rounded-lg p-4 w-[300px] sm:w-[200px] flex items-center gap-3 text-white h-[100px] cursor-pointer"
      style={{ backgroundColor: color }}
            onClick={() => navigate(`/allleads?tabName=${contentName.toLowerCase().replace(/\s+/g, '_')}`)}
      
    >
      {IconComponent && <IconComponent className="w-9 h-9 shrink-0" />}
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{numberValue}</span>
        <span className="text-sm whitespace-normal">{contentName}</span>
      </div>
    </div>
  );
};