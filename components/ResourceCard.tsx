
import React from 'react';
import { Resource } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface ResourceCardProps {
  resource: Resource;
}

const HeartIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.645 20.91a.75.75 0 0 1-1.29 0A12.952 12.952 0 0 0 3 10.577V6.22a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 9 6.22v1.019a4.5 4.5 0 0 0 6 0V6.22A2.25 2.25 0 0 1 17.25 3.97h1.5A2.25 2.25 0 0 1 21 6.22v4.357a12.952 12.952 0 0 0-7.355 10.333Z" />
    </svg>
);

const HeartIconOutline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);


const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { toggleFavoriteResource, isResourceFavorite } = useAppContext();
  const isFavorite = isResourceFavorite(resource.id);

  return (
    <div className="bg-rei-card-light dark:bg-rei-card-dark rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-rei-blue dark:text-rei-green">{resource.title}</h3>
          <button 
            onClick={() => toggleFavoriteResource(resource.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {isFavorite ? <HeartIconSolid className="w-6 h-6" /> : <HeartIconOutline className="w-6 h-6" />}
          </button>
        </div>
        <span className="text-xs bg-rei-blue text-white dark:bg-rei-green dark:text-rei-bg-dark px-2 py-1 rounded-full mb-2 inline-block">{resource.type}</span>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{resource.description}</p>
        <div className="mb-3">
          {resource.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-1 mb-1 inline-block">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-rei-blue dark:text-rei-green hover:underline font-medium"
      >
        Visitar Recurso &rarr;
      </a>
    </div>
  );
};

export default ResourceCard;
    