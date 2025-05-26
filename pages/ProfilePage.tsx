
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
// Fix: Explicitly import from constants.tsx to resolve module issue
import { ROADMAPS_DATA } from '../constants.tsx';
import ProgressBar from '../components/ProgressBar';
import ResourceCard from '../components/ResourceCard';
import { Link, useNavigate } from 'react-router-dom';

const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);


const ProfilePage: React.FC = () => {
  const { userProfile, setUserProfile, roadmapProgress, getRoadmapProgressPercentage, getFavoriteResourcesDetails } = useAppContext();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  // Initialize editableProfile with a default structure if userProfile is null initially to prevent errors
  const [editableProfile, setEditableProfile] = useState(userProfile || { username: '', email: '', profilePictureUrl: ''});

  useEffect(() => {
    if (!userProfile) {
      navigate('/login');
    } else {
      // Sync editableProfile if userProfile changes (e.g., after login)
      setEditableProfile(userProfile);
    }
  }, [userProfile, navigate]);

  const handleEditToggle = () => {
    if (isEditing && userProfile) { // Save changes
      setUserProfile(editableProfile);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({ ...prev!, [name]: value }));
  };
  
  const startedRoadmaps = ROADMAPS_DATA.filter(roadmap => 
    userProfile && roadmapProgress[roadmap.id] && Object.keys(roadmapProgress[roadmap.id]).length > 0
  );

  const favoriteResourcesDetails = userProfile ? getFavoriteResourcesDetails() : [];

  if (!userProfile) {
    // Este return es un fallback, useEffect debería redirigir antes.
    return null; 
  }


  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-rei-blue dark:text-rei-green mb-2">Mi Perfil</h1>
      </header>

      {/* Información Personal */}
      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Información Personal</h2>
          <button 
            onClick={handleEditToggle} 
            className="flex items-center text-rei-blue dark:text-rei-green hover:underline"
          >
            <PencilIcon className="w-5 h-5 mr-1" />
            {isEditing ? 'Guardar' : 'Editar'}
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {editableProfile.profilePictureUrl ? (
            <img src={editableProfile.profilePictureUrl} alt="Foto de perfil" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md" />
          ) : (
            <UserCircleIcon className="w-24 h-24 md:w-32 md:h-32 text-gray-400 dark:text-gray-500" />
          )}
          <div className="flex-grow space-y-3 text-center md:text-left">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nombre de Usuario</label>
              {isEditing ? (
                <input type="text" name="username" value={editableProfile.username} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"/>
              ) : (
                <p className="text-lg font-semibold">{editableProfile.username}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Correo Electrónico</label>
              {isEditing ? (
                <input type="email" name="email" value={editableProfile.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"/>
              ) : (
                <p className="text-lg">{editableProfile.email}</p>
              )}
            </div>
             {isEditing && (
               <div>
                  <label htmlFor="profilePictureUrl" className="block text-sm font-medium text-gray-500 dark:text-gray-400">URL Foto de Perfil</label>
                  <input
                    type="text"
                    name="profilePictureUrl"
                    id="profilePictureUrl"
                    value={editableProfile.profilePictureUrl || `https://picsum.photos/seed/${editableProfile.username}/200/200`}
                    onChange={handleChange}
                    placeholder="https://example.com/image.png"
                    className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
             )}
            {!isEditing && <button className="text-sm text-rei-blue dark:text-rei-green hover:underline mt-2">Cambiar contraseña (UI)</button>}
          </div>
        </div>
      </section>

      {/* Mis Roadmaps / Mi Progreso */}
      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Mis Roadmaps en Progreso</h2>
        {startedRoadmaps.length > 0 ? (
          <div className="space-y-4">
            {startedRoadmaps.map(roadmap => {
              const progress = getRoadmapProgressPercentage(roadmap.id);
              return (
                <div key={roadmap.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-rei-blue dark:text-rei-green">{roadmap.title}</h3>
                    <Link to={`/roadmap/${roadmap.id}`} className="text-sm text-rei-blue dark:text-rei-green hover:underline">Continuar</Link>
                  </div>
                  <ProgressBar progress={progress} label={`${progress}% completado`} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Aún no has comenzado ningún roadmap. <Link to="/" className="text-rei-blue dark:text-rei-green hover:underline">¡Explora los roadmaps!</Link></p>
        )}
      </section>

      {/* Recursos Guardados/Favoritos */}
      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Mis Recursos Favoritos</h2>
        {favoriteResourcesDetails.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteResourcesDetails.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No tienes recursos guardados. <Link to="/resources" className="text-rei-blue dark:text-rei-green hover:underline">¡Explora los recursos!</Link></p>
        )}
      </section>
      
      {/* Configuración de Notificaciones (UI Only) */}
      <section className="bg-rei-card-light dark:bg-rei-card-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Configuración de Notificaciones</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Preferencias sobre qué tipo de correos o alertas desea recibir.</p>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-rei-blue dark:text-rei-green rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Nuevos recursos en mis roadmaps</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-rei-blue dark:text-rei-green rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" defaultChecked />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Actualizaciones de la plataforma</span>
          </label>
        </div>
      </section>

      {/* Cerrar Sesión */}
      <section className="text-center mt-8">
        <button 
          onClick={() => {
            setUserProfile(null);
            // alert("Sesión cerrada. Serás redirigido a la página de inicio de sesión."); // Opcional
            navigate("/login"); 
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Cerrar Sesión
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;