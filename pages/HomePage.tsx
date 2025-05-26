
import React from 'react';
import { Link } from 'react-router-dom';
import RoadmapCard from '../components/RoadmapCard';
import { ROADMAPS_DATA } from '../constants';

const DocumentMagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);


const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-rei-blue dark:text-rei-green mb-4">
          Bienvenido a REI: Roadmaps Chile
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Tu plataforma para guiar el aprendizaje y desarrollo en el sector tecnológico chileno. Elige tu camino y comienza a crecer profesionalmente.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">Elige tu Especialización</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {ROADMAPS_DATA.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      </section>

      <section className="text-center py-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Prepárate para tu Entrevista</h2>
        <div className="max-w-xl mx-auto bg-rei-card-light dark:bg-rei-card-dark p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <DocumentMagnifyingGlassIcon className="w-16 h-16 text-rei-blue dark:text-rei-green mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Pon a prueba tus conocimientos y familiarízate con preguntas técnicas típicas de entrevistas para cada especialización.
          </p>
          <Link
            to="/pruebas-tecnicas"
            className="inline-block bg-rei-green hover:bg-opacity-80 dark:bg-rei-blue dark:hover:bg-rei-blue-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 text-lg"
          >
            Ir a Pruebas Técnicas
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
