
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Fix: Explicitly import from constants.tsx to resolve module issue
import { ROADMAPS_DATA, RESOURCES_DATA } from '../constants.tsx';
import { Roadmap, RoadmapModule, RoadmapItem as RoadmapItemType } from '../types';
import ResourceCard from '../components/ResourceCard'; // Reutilizar ResourceCard si es adecuado
import { useAppContext } from '../contexts/AppContext';

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const RoadmapItemDetailPage: React.FC = () => {
  const { roadmapId, moduleId, itemId } = useParams<{ roadmapId: string; moduleId: string; itemId: string }>();
  const navigate = useNavigate();
  useAppContext(); // For consistent styling if needed

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [module, setModule] = useState<RoadmapModule | null>(null);
  const [item, setItem] = useState<RoadmapItemType | null>(null);

  useEffect(() => {
    const currentRoadmap = ROADMAPS_DATA.find(r => r.id === roadmapId);
    if (currentRoadmap) {
      setRoadmap(currentRoadmap);
      const currentModule = currentRoadmap.modules.find(m => m.id === moduleId);
      if (currentModule) {
        setModule(currentModule);
        const currentItem = currentModule.items.find(i => i.id === itemId);
        setItem(currentItem || null);
      } else {
        setItem(null); // Module not found
      }
    } else {
      setItem(null); // Roadmap not found
    }
  }, [roadmapId, moduleId, itemId]);

  const filteredResources = useMemo(() => {
    if (!item) return [];
    // Filter resources where one of the tags matches the item.id (e.g., 'html', 'react')
    // Assumes item.id is a relevant tag.
    const itemTag = item.id.toLowerCase();
    return RESOURCES_DATA.filter(resource => 
      resource.tags.map(tag => tag.toLowerCase()).includes(itemTag)
    );
  }, [item]);

  if (!roadmap || !module || !item) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Detalle no encontrado</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          No se pudo encontrar el ítem del roadmap especificado.
        </p>
        <button
          onClick={() => navigate(roadmapId ? `/roadmap/${roadmapId}` : '/')}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rei-blue hover:bg-rei-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rei-blue-dark dark:bg-rei-green dark:hover:bg-opacity-80"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          {roadmap ? `Volver a ${roadmap.title}` : 'Volver al inicio'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <Link 
          to={`/roadmap/${roadmap.id}`} 
          className="inline-flex items-center text-rei-blue dark:text-rei-green hover:underline mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Volver a {roadmap.title}
        </Link>
        <h1 className="text-4xl font-bold text-rei-blue dark:text-rei-green">{item.name}</h1>
        {item.description && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">{item.description}</p>
        )}
      </header>

      {/* Recursos Recomendados */}
      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Recursos Recomendados para "{item.name}"</h2>
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron recursos específicos para este tema. ¡Intenta una búsqueda más amplia en la <Link to="/resources" className="text-rei-blue dark:text-rei-green hover:underline">sección de Recursos</Link>!
          </p>
        )}
      </section>

      {/* Preguntas Técnicas */}
      {item.technicalQuestions && item.technicalQuestions.length > 0 && (
        <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Preguntas Técnicas Típicas</h2>
          <ul className="space-y-4 list-disc list-inside pl-5">
            {item.technicalQuestions.map((question, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 text-md">
                {question}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default RoadmapItemDetailPage;
