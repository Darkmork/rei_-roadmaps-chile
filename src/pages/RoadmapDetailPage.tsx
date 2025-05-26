
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Link importado
// Fix: Explicitly import from constants.tsx to resolve module issue
import { ROADMAPS_DATA } from '../constants.tsx';
import { Roadmap, RoadmapModule, RoadmapItem as RoadmapItemType } from '../types';
import ProgressBar from '../components/ProgressBar';
import { useAppContext } from '../contexts/AppContext';

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L10.5 12.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06L9.44 14l3.186-3.186Z" clipRule="evenodd" />
  </svg>
);

const CircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// Componente RoadmapItem modificado
const RoadmapItem: React.FC<{ item: RoadmapItemType; roadmapId: string; moduleId: string; }> = ({ item, roadmapId, moduleId }) => {
  const { roadmapProgress, updateRoadmapProgress } = useAppContext();
  const isCompleted = roadmapProgress[roadmapId]?.[moduleId]?.[item.id] || false;

  const handleToggleCompletion = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el click se propague al Link si el ícono está dentro del Link
    updateRoadmapProgress(roadmapId, moduleId, item.id, !isCompleted);
  };

  return (
    <li 
      className={`p-3 rounded-md transition-colors flex items-start justify-between ${isCompleted ? 'bg-green-50 dark:bg-green-900/50' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50'}`}
    >
      <div className="flex items-start flex-grow">
        <button
          onClick={handleToggleCompletion}
          aria-label={isCompleted ? "Marcar como no completado" : "Marcar como completado"}
          className="flex-shrink-0 p-1 mr-3 focus:outline-none rounded-full"
        >
          {isCompleted ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <CircleIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />}
        </button>
        
        <div className="flex-grow">
          <Link 
            to={`/roadmap/${roadmapId}/module/${moduleId}/item/${item.id}`} 
            className={`font-medium hover:underline ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-rei-blue dark:text-rei-green'}`}
          >
            {item.name}
          </Link>
          {item.description && (
            <p className={`text-sm mt-0.5 ${isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
              {item.description}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

const RoadmapDetailPage: React.FC = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const { getRoadmapProgressPercentage, roadmapProgress } = useAppContext();

  useEffect(() => {
    const currentRoadmap = ROADMAPS_DATA.find(r => r.id === roadmapId);
    setRoadmap(currentRoadmap || null);
  }, [roadmapId]);
  
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (roadmapId) {
      setProgress(getRoadmapProgressPercentage(roadmapId));
    }
  }, [roadmapId, roadmapProgress, getRoadmapProgressPercentage]);


  if (!roadmap) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Roadmap no encontrado</h1>
        <Link to="/" className="text-rei-blue dark:text-rei-green hover:underline mt-4 inline-block">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-4">
          {roadmap.icon && <div className="flex-shrink-0">{roadmap.icon}</div>}
          <h1 className="text-4xl font-bold text-rei-blue dark:text-rei-green">{roadmap.title}</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{roadmap.concept}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Enfoque:</span> {roadmap.focus}</p>
        <div className="mt-6">
          <ProgressBar progress={progress} label="Progreso General del Roadmap" />
        </div>
      </header>

      {roadmap.modules.map((module: RoadmapModule) => (
        <section key={module.id} className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{module.title}</h2>
          <ul className="space-y-3">
            {module.items.map((item: RoadmapItemType) => (
              <RoadmapItem key={item.id} item={item} roadmapId={roadmap.id} moduleId={module.id} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default RoadmapDetailPage;