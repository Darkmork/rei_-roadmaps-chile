
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROADMAPS_DATA } from '../constants';
import { Roadmap, RoadmapModule, RoadmapItem as RoadmapItemType } from '../types';
import { useAppContext } from '../contexts/AppContext';

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const ChevronUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-rei-blue dark:text-rei-green">{title}</h3>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-rei-card-dark">
          {children}
        </div>
      )}
    </div>
  );
};


const TechnicalTestPage: React.FC = () => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
  const { darkMode } = useAppContext();

  const selectedRoadmap = ROADMAPS_DATA.find(r => r.id === selectedRoadmapId);

  const handleRoadmapSelection = (roadmapId: string) => {
    setSelectedRoadmapId(roadmapId);
  };

  // Check if any item in the roadmap has technical questions
  const roadmapHasQuestions = (roadmap: Roadmap): boolean => {
    return roadmap.modules.some(module =>
      module.items.some(item => item.technicalQuestions && item.technicalQuestions.length > 0)
    );
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-rei-blue dark:text-rei-green mb-4">Pruebas Técnicas por Roadmap</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Selecciona un roadmap para revisar preguntas técnicas típicas de entrevistas, agrupadas por tema.
        </p>
      </header>

      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">Selecciona un Roadmap</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ROADMAPS_DATA.map(roadmap => (
            <button
              key={roadmap.id}
              onClick={() => handleRoadmapSelection(roadmap.id)}
              disabled={!roadmapHasQuestions(roadmap)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
                ${selectedRoadmapId === roadmap.id 
                  ? 'bg-rei-blue text-white dark:bg-rei-green dark:text-rei-bg-dark ring-2 ring-offset-2 dark:ring-offset-rei-bg-dark ring-rei-blue dark:ring-rei-green' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}
                ${!roadmapHasQuestions(roadmap) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {roadmap.title} {!roadmapHasQuestions(roadmap) && "(Sin preguntas)"}
            </button>
          ))}
        </div>

        {!selectedRoadmapId && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Elige un roadmap para comenzar a prepararte.
          </p>
        )}

        {selectedRoadmap && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-rei-blue dark:text-rei-green mb-4">
              Preguntas para: {selectedRoadmap.title}
            </h2>
            {selectedRoadmap.modules.map(module => {
              const itemsWithQuestions = module.items.filter(item => item.technicalQuestions && item.technicalQuestions.length > 0);
              if (itemsWithQuestions.length === 0) return null;

              return (
                <AccordionSection key={module.id} title={module.title} initiallyOpen={true}>
                  <div className="space-y-4">
                    {itemsWithQuestions.map(item => (
                      <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md shadow-sm">
                        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          <Link to={`/roadmap/${selectedRoadmap.id}/module/${module.id}/item/${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h4>
                        <ul className="list-disc list-inside space-y-1 pl-4 text-sm text-gray-600 dark:text-gray-400">
                          {item.technicalQuestions?.map((question, index) => (
                            <li key={index}>{question}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionSection>
              );
            })}
            {!roadmapHasQuestions(selectedRoadmap) && (
                 <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    Este roadmap aún no tiene preguntas técnicas asociadas.
                 </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default TechnicalTestPage;
