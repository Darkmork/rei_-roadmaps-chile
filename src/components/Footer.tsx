
import React from 'react';

// Iconos SVG para redes sociales
const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const XTwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-rei-card-light dark:bg-rei-card-dark shadow-inner py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-rei-blue dark:hover:text-rei-green transition-colors">
            <GitHubIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-rei-blue dark:hover:text-rei-green transition-colors">
            <LinkedInIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="X (Twitter)" className="text-gray-500 hover:text-rei-blue dark:hover:text-rei-green transition-colors">
            <XTwitterIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-rei-blue dark:hover:text-rei-green transition-colors">
            <FacebookIcon className="w-6 h-6" />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} REI: PREPARACIÓN PARA ESTUDIANTES DE INGENIERÍA INFORMÁTICA. Todos los derechos reservados.</p>
        <p className="text-sm mt-1">Tu guía en el camino al mundo tech.</p>
      </div>
    </footer>
  );
};

export default Footer;