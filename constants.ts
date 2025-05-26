
import React from 'react';
import { Roadmap, Resource } from './types';

// Icons (Heroicons)
// Rewritten using React.createElement to avoid JSX parsing issues in .ts files.
// This addresses errors like "Cannot find name 'svg'", "Cannot redeclare block-scoped variable 'fill'",
// and issues with component usage.
const CodeBracketIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props
  },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
    })
  )
);

const ServerStackIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props
  },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
    })
  )
);

const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props
  },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  )
);


export const ROADMAPS_DATA: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    concept: "Conviértete en un arquitecto de la experiencia digital. Aprenderás a construir la parte visible e interactiva de los sitios y aplicaciones web con la que los usuarios interactúan directamente. Dominarás tecnologías como HTML, CSS, JavaScript y frameworks modernos para crear interfaces atractivas, funcionales y responsivas.",
    focus: "Experiencia de Usuario (UX), Interfaz de Usuario (UI), diseño visual, interactividad.",
    // Fix: Use React.createElement for icon instantiation
    icon: React.createElement(CodeBracketIcon, { className: "w-12 h-12 text-rei-blue dark:text-rei-green" }),
    modules: [
      { id: 'fundamentos_frontend', title: 'Fundamentos Esenciales', items: [
        { id: 'html', name: 'HTML5', description: 'Estructura semántica de la web.' },
        { id: 'css', name: 'CSS3', description: 'Estilización y diseño visual, incluyendo Flexbox y Grid.' },
        { id: 'javascript', name: 'JavaScript (ES6+)', description: 'Lenguaje de programación fundamental para la web.' },
        { id: 'dom', name: 'Manipulación del DOM', description: 'Interactuar con la estructura de la página.' },
        { id: 'responsive', name: 'Responsive Design', description: 'Adaptación a diferentes tamaños de pantalla.' },
      ]},
      { id: 'frameworks_frontend', title: 'Frameworks y Librerías', items: [
        { id: 'react', name: 'React.js', description: 'Librería popular para construir interfaces de usuario.' },
        { id: 'vue', name: 'Vue.js', description: 'Framework progresivo para UI.' },
        { id: 'angular', name: 'Angular', description: 'Plataforma completa para desarrollo de aplicaciones.' },
        { id: 'state_management', name: 'Gestión de Estado (Redux, Zustand, Pinia)', description: 'Manejo de estado complejo en aplicaciones.' },
      ]},
      { id: 'herramientas_frontend', title: 'Herramientas y Ecosistema', items: [
        { id: 'git', name: 'Git y GitHub/GitLab', description: 'Control de versiones.' },
        { id: 'npm_yarn', name: 'NPM / Yarn', description: 'Gestores de paquetes.' },
        { id: 'bundlers', name: 'Webpack / Vite / Parcel', description: 'Empaquetadores de módulos.' },
        { id: 'testing_frontend', name: 'Testing (Jest, React Testing Library)', description: 'Pruebas unitarias y de integración.' },
        { id: 'apis_frontend', name: 'Consumo de APIs REST/GraphQL', description: 'Obtención de datos del backend.' },
      ]},
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    concept: "Sé el motor detrás de las aplicaciones. Te enfocarás en la lógica del servidor, las bases de datos y las APIs (Interfaces de Programación de Aplicaciones) que hacen que todo funcione correctamente. Aprenderás a gestionar datos, asegurar la información y garantizar el rendimiento y la escalabilidad de las plataformas digitales.",
    focus: "Lógica de negocio, bases de datos, APIs, seguridad del servidor, rendimiento.",
    // Fix: Use React.createElement for icon instantiation
    icon: React.createElement(ServerStackIcon, { className: "w-12 h-12 text-rei-blue dark:text-rei-green" }),
    modules: [
      { id: 'lenguajes_backend', title: 'Lenguajes de Programación', items: [
        { id: 'nodejs', name: 'Node.js (JavaScript/TypeScript)', description: 'Entorno de ejecución para JavaScript en servidor.' },
        { id: 'python_backend', name: 'Python (Django, Flask)', description: 'Versátil y popular para desarrollo web.' },
        { id: 'java_backend', name: 'Java (Spring Boot)', description: 'Robusto y escalable para aplicaciones empresariales.' },
        { id: 'ruby_backend', name: 'Ruby (Ruby on Rails)', description: 'Conocido por su productividad.' },
      ]},
      { id: 'bases_de_datos_backend', title: 'Bases de Datos', items: [
        { id: 'sql', name: 'Bases de Datos SQL (PostgreSQL, MySQL)', description: 'Modelos relacionales.' },
        { id: 'nosql', name: 'Bases de Datos NoSQL (MongoDB, Redis)', description: 'Modelos no relacionales, flexibles.' },
        { id: 'orms', name: 'ORMs/ODMs (Sequelize, Mongoose)', description: 'Mapeo objeto-relacional/documento.' },
      ]},
      { id: 'apis_backend', title: 'APIs y Comunicación', items: [
        { id: 'rest_api', name: 'Diseño de APIs RESTful', description: 'Principios y buenas prácticas.' },
        { id: 'graphql_api', name: 'GraphQL', description: 'Lenguaje de consulta para APIs.' },
        { id: 'autenticacion_autorizacion', name: 'Autenticación y Autorización (JWT, OAuth)', description: 'Seguridad de APIs.' },
      ]},
      { id: 'devops_backend', title: 'DevOps y Despliegue', items: [
        { id: 'docker', name: 'Docker', description: 'Contenerización de aplicaciones.' },
        { id: 'kubernetes', name: 'Kubernetes', description: 'Orquestación de contenedores.' },
        { id: 'ci_cd', name: 'CI/CD (GitHub Actions, Jenkins)', description: 'Integración y despliegue continuo.' },
        { id: 'cloud_platforms', name: 'Plataformas Cloud (AWS, Azure, GCP)', description: 'Servicios en la nube.' },
      ]},
    ],
  },
  {
    id: 'data-analysis',
    title: 'Análisis de Datos',
    concept: "Transforma datos crudos en decisiones inteligentes. Te sumergirás en el mundo de la extracción, procesamiento, análisis e interpretación de grandes volúmenes de información para descubrir tendencias, generar insights y comunicar tus hallazgos de forma efectiva mediante visualizaciones. Aprenderás a usar herramientas y lenguajes especializados para resolver problemas complejos.",
    focus: "Estadística, minería de datos, inteligencia de negocios, visualización, machine learning (básico).",
    // Fix: Use React.createElement for icon instantiation
    icon: React.createElement(ChartBarIcon, { className: "w-12 h-12 text-rei-blue dark:text-rei-green" }),
    modules: [
      { id: 'fundamentos_datos', title: 'Fundamentos y Lenguajes', items: [
        { id: 'python_datos', name: 'Python (Pandas, NumPy, SciPy)', description: 'Librerías esenciales para análisis de datos.' },
        { id: 'r_lang', name: 'R', description: 'Lenguaje estadístico y de visualización.' },
        { id: 'sql_datos', name: 'SQL para Análisis', description: 'Consultas y manipulación de datos.' },
        { id: 'estadistica', name: 'Estadística Descriptiva e Inferencial', description: 'Bases matemáticas del análisis.' },
      ]},
      { id: 'procesamiento_datos', title: 'Procesamiento y Limpieza', items: [
        { id: 'data_wrangling', name: 'Data Wrangling y Limpieza', description: 'Transformación de datos crudos.' },
        { id: 'etl', name: 'Procesos ETL', description: 'Extracción, Transformación y Carga de datos.' },
        { id: 'apis_datos', name: 'Uso de APIs para obtención de datos', description: 'Conexión a fuentes de datos externas.' },
      ]},
      { id: 'visualizacion_datos', title: 'Visualización de Datos', items: [
        { id: 'matplotlib_seaborn', name: 'Matplotlib y Seaborn (Python)', description: 'Creación de gráficos estáticos e interactivos.' },
        { id: 'plotly_dash', name: 'Plotly y Dash (Python)', description: 'Dashboards interactivos.' },
        { id: 'tableau_powerbi', name: 'Herramientas BI (Tableau, Power BI)', description: 'Plataformas de visualización y BI.' },
      ]},
      { id: 'ml_basico', title: 'Machine Learning (Básico)', items:
        [
          { id: 'conceptos_ml', name: 'Conceptos de Machine Learning', description: 'Aprendizaje supervisado y no supervisado.' },
          { id: 'scikit_learn', name: 'Scikit-learn (Python)', description: 'Librería para modelos de ML.' },
          { id: 'evaluacion_modelos', name: 'Evaluación de Modelos', description: 'Métricas y técnicas.' },
        ]
      },
    ],
  },
];

export const RESOURCES_DATA: Resource[] = [
  { id: 'res1', title: 'MDN Web Docs (HTML, CSS, JS)', type: 'Documentación', description: 'Referencia completa para tecnologías web.', url: 'https://developer.mozilla.org/', tags: ['frontend', 'html', 'css', 'javascript'] },
  { id: 'res2', title: 'FreeCodeCamp', type: 'Curso Online', description: 'Aprende a programar gratis. Construye proyectos.', url: 'https://www.freecodecamp.org/', tags: ['frontend', 'backend', 'data analysis', 'fullstack'] },
  { id: 'res3', title: 'React Official Docs', type: 'Documentación', description: 'Documentación oficial de React.', url: 'https://react.dev/', tags: ['frontend', 'react', 'javascript'] },
  { id: 'res4', title: 'Node.js Official Docs', type: 'Documentación', description: 'Documentación oficial de Node.js.', url: 'https://nodejs.org/en/docs', tags: ['backend', 'nodejs', 'javascript'] },
  { id: 'res5', title: 'Stack Overflow', type: 'Comunidad', description: 'Comunidad de Q&A para programadores.', url: 'https://stackoverflow.com/', tags: ['general', 'programming'] },
  { id: 'res6', title: 'Django Project Docs', type: 'Documentación', description: 'Documentación oficial de Django.', url: 'https://docs.djangoproject.com/', tags: ['backend', 'python', 'django'] },
  { id: 'res7', title: 'Kaggle', type: 'Comunidad', description: 'Plataforma para científicos de datos y competencias de ML.', url: 'https://www.kaggle.com/', tags: ['data analysis', 'machine learning'] },
  { id: 'res8', title: 'Coursera: Data Science Specializations', type: 'Curso Online', description: 'Cursos y especializaciones en ciencia de datos.', url: 'https://www.coursera.org/browse/data-science', tags: ['data analysis', 'python', 'r', 'machine learning'] },
  { id: 'res9', title: 'CSS-Tricks', type: 'Artículo', description: 'Artículos y tutoriales sobre CSS.', url: 'https://css-tricks.com/', tags: ['frontend', 'css'] },
  { id: 'res10', title: 'Dev.to', type: 'Comunidad', description: 'Comunidad de desarrolladores de software.', url: 'https://dev.to/', tags: ['general', 'programming'] },
  { id: 'res11', title: 'The Odin Project', type: 'Curso Online', description: 'Currículum completo para desarrollo web full-stack.', url: 'https://www.theodinproject.com/', tags: ['frontend', 'backend', 'fullstack'] },
  { id: 'res12', title: 'DataCamp', type: 'Curso Online', description: 'Cursos interactivos de ciencia de datos y programación.', url: 'https://www.datacamp.com/', tags: ['data analysis', 'python', 'r', 'sql'] },
  { id: 'res13', title: 'Vue.js Official Docs', type: 'Documentación', description: 'Documentación oficial de Vue.js.', url: 'https://vuejs.org/', tags: ['frontend', 'vue', 'javascript'] },
  { id: 'res14', title: 'Spring Framework Docs', type: 'Documentación', description: 'Documentación oficial de Spring Framework (Java).', url: 'https://spring.io/docs', tags: ['backend', 'java', 'spring'] },
  { id: 'res15', title: 'Awesome Python', type: 'Herramienta', description: 'Lista curada de frameworks, librerías y software Python.', url: 'https://github.com/vinta/awesome-python', tags: ['python', 'backend', 'data analysis'] },
];