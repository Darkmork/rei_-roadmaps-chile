
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { UserProfile, RoadmapProgress, Resource } from '../types';
// Fix: Import ROADMAPS_DATA at the top level using ES6 import.
import { ROADMAPS_DATA, RESOURCES_DATA } from '../constants';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  roadmapProgress: RoadmapProgress;
  updateRoadmapProgress: (roadmapId: string, moduleId: string, itemId: string, completed: boolean) => void;
  getRoadmapProgressPercentage: (roadmapId: string) => number;
  favoriteResources: string[]; // array of resource IDs
  toggleFavoriteResource: (resourceId: string) => void;
  isResourceFavorite: (resourceId: string) => boolean;
  getFavoriteResourcesDetails: () => Resource[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('rei-dark-mode', false);
  // Cambiar estado inicial de userProfile a null
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('rei-user-profile', null);
  const [roadmapProgress, setRoadmapProgress] = useLocalStorage<RoadmapProgress>('rei-roadmap-progress', {});
  const [favoriteResources, setFavoriteResources] = useLocalStorage<string[]>('rei-favorite-resources', []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const updateRoadmapProgress = (roadmapId: string, moduleId: string, itemId: string, completed: boolean) => {
    setRoadmapProgress(prev => {
      const newProgress = { ...prev };
      if (!newProgress[roadmapId]) newProgress[roadmapId] = {};
      if (!newProgress[roadmapId][moduleId]) newProgress[roadmapId][moduleId] = {};
      newProgress[roadmapId][moduleId][itemId] = completed;
      return newProgress;
    });
  };
  
  const getRoadmapProgressPercentage = (roadmapId: string): number => {
    const roadmap = ROADMAPS_DATA.find(r => r.id === roadmapId);
    if (!roadmap) return 0;

    let totalItems = 0;
    let completedItems = 0;

    roadmap.modules.forEach(module => {
      totalItems += module.items.length;
      module.items.forEach(item => {
        if (roadmapProgress[roadmapId]?.[module.id]?.[item.id]) {
          completedItems++;
        }
      });
    });
    
    return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  };

  const toggleFavoriteResource = (resourceId: string) => {
    setFavoriteResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const isResourceFavorite = (resourceId: string): boolean => {
    return favoriteResources.includes(resourceId);
  };

  const getFavoriteResourcesDetails = (): Resource[] => {
    return RESOURCES_DATA.filter(resource => favoriteResources.includes(resource.id)).map(r => ({...r, isFavorite: true}));
  };


  return (
    <AppContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      userProfile, 
      setUserProfile,
      roadmapProgress,
      updateRoadmapProgress,
      getRoadmapProgressPercentage,
      favoriteResources,
      toggleFavoriteResource,
      isResourceFavorite,
      getFavoriteResourcesDetails
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};