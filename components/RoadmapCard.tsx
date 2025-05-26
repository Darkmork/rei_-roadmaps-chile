
import React from 'react';
import { Link } from 'react-router-dom';
import { Roadmap } from '../types';

interface RoadmapCardProps {
  roadmap: Roadmap;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap }) => {
  return (
    <div className="bg-rei-card-light dark:bg-rei-card-dark rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      {roadmap.imageUrl && (
        <img 
          src={roadmap.imageUrl} 
          alt={`Imagen de ${roadmap.title}`} 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-3 mb-4">
          {roadmap.icon && <div className="flex-shrink-0">{roadmap.icon}</div>}
          <h2 className="text-2xl font-bold text-rei-blue dark:text-rei-green">{roadmap.title}</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm leading-relaxed min-h-[100px] flex-grow">{roadmap.concept}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4"><span className="font-semibold">Enfoque:</span> {roadmap.focus}</p>
        <Link
          to={`/roadmap/${roadmap.id}`}
          className="mt-auto inline-block bg-rei-blue hover:bg-rei-blue-dark dark:bg-rei-green dark:hover:bg-opacity-80 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 text-center"
        >
          Explorar Roadmap
        </Link>
      </div>
    </div>
  );
};

export default RoadmapCard;