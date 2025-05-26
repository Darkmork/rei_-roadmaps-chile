
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div>
      {label && <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</div>}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div
          className="bg-rei-blue dark:bg-rei-green h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        >
           <span className="text-xs font-medium text-white flex items-center justify-center h-full">
            {safeProgress > 10 ? `${safeProgress}%` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
    