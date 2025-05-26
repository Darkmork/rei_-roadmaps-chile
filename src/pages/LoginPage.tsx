import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserProfile } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de autenticación
    if (username) { // Solo verificamos que el username no esté vacío para la simulación
      setUserProfile({
        username: username,
        email: `${username.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        profilePictureUrl: `https://picsum.photos/seed/${username}/100/100`,
      });
      navigate('/'); // Redirigir a la página de inicio o a /profile
    } else {
      alert('Por favor, ingresa un nombre de usuario.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-rei-card-light dark:bg-rei-card-dark p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-rei-blue dark:text-rei-green">
            Iniciar Sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-rei-text-light dark:text-rei-text-dark bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-rei-blue dark:focus:ring-rei-green focus:border-rei-blue dark:focus:border-rei-green focus:z-10 sm:text-sm"
                placeholder="Nombre de usuario (ej: devChile)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password_fake" className="sr-only">
                Contraseña
              </label>
              <input
                id="password_fake"
                name="password_fake"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-rei-text-light dark:text-rei-text-dark bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-rei-blue dark:focus:ring-rei-green focus:border-rei-blue dark:focus:border-rei-green focus:z-10 sm:text-sm"
                placeholder="Contraseña (simulada)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rei-blue hover:bg-rei-blue-dark dark:bg-rei-green dark:hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rei-blue-dark dark:focus:ring-offset-rei-bg-dark dark:focus:ring-rei-green"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
