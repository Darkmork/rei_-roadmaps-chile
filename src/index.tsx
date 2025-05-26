import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Importar el componente principal App
import { AppProvider } from './contexts/AppContext'; // Importar el AppProvider

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Este error debería ser capturado y manejado, pero por ahora, hagámoslo muy claro.
  // Puedes añadir un fallback o un mensaje más amigable en una app real.
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = `
    <div style="color: red; padding: 20px; border: 2px solid red; margin: 20px; font-family: sans-serif;">
      <h2>Error Crítico</h2>
      <p>No se pudo encontrar el elemento con id='root' en el HTML.</p>
      <p>Asegúrese de que su archivo index.html contenga un elemento como: <code>&lt;div id="root"&gt;&lt;/div&gt;</code>.</p>
    </div>
  `;
  document.body.prepend(errorDiv);
  throw new Error("Could not find root element to mount to. Ensure a div with id='root' exists in your HTML.");
}

const root = createRoot(rootElement);

// Log to console to confirm script execution before attempting to render
console.log(`index.tsx: Script execution started. Attempting to render full application with React version: ${React.version}`);

try {
  root.render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
  console.log("index.tsx: Full application render command executed successfully.");
} catch (error) {
  console.error("index.tsx: Error during full application render:", error);
  // Opcionalmente mostrar este error en la UI también
  const errorRenderDiv = document.createElement('div');
  errorRenderDiv.innerHTML = `
    <div style="color: red; padding: 20px; border: 2px solid red; margin: 20px; font-family: sans-serif;">
      <h2>Error al Renderizar React</h2>
      <p>Ocurrió un error al intentar renderizar la aplicación React. Revisa la consola para más detalles.</p>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
    </div>
  `;
  document.body.prepend(errorRenderDiv);
}
