
import React, { useState, useMemo } from 'react';
import ResourceCard from '../components/ResourceCard';
import { RESOURCES_DATA } from '../constants';
import { Resource } from '../types';

const ResourceTypeFilters: Resource['type'][] = ['Curso Online', 'Documentación', 'Comunidad', 'Herramienta', 'Artículo'];
const TagFilters = Array.from(new Set(RESOURCES_DATA.flatMap(r => r.tags))).sort();


const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<Resource['type'] | ''>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter(resource => {
      const matchesSearchTerm = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType ? resource.type === selectedType : true;
      const matchesTag = selectedTag ? resource.tags.includes(selectedTag) : true;
      return matchesSearchTerm && matchesType && matchesTag;
    });
  }, [searchTerm, selectedType, selectedTag]);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-rei-blue dark:text-rei-green mb-4">Recursos de Aprendizaje</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Explora una colección curada de cursos, documentación, comunidades y herramientas para impulsar tu carrera tecnológica.
        </p>
      </section>

      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Filtrar Recursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-rei-blue focus:border-rei-blue dark:focus:ring-rei-green dark:focus:border-rei-green"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-rei-blue focus:border-rei-blue dark:focus:ring-rei-green dark:focus:border-rei-green"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as Resource['type'] | '')}
          >
            <option value="">Todos los Tipos</option>
            {ResourceTypeFilters.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-rei-blue focus:border-rei-blue dark:focus:ring-rei-green dark:focus:border-rei-green"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">Todas las Etiquetas</option>
            {TagFilters.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
         {filteredResources.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No se encontraron recursos con los filtros aplicados.</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
    