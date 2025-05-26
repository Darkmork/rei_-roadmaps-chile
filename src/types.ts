
export interface RoadmapItem {
  id: string;
  name: string;
  description?: string;
  completed?: boolean;
  technicalQuestions?: string[]; // Nueva propiedad para preguntas técnicas
}

export interface RoadmapModule {
  id: string;
  title: string;
  items: RoadmapItem[];
}

export interface Roadmap {
  id: string;
  title: string;
  concept: string;
  focus: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  modules: RoadmapModule[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'Curso Online' | 'Documentación' | 'Comunidad' | 'Herramienta' | 'Artículo';
  description: string;
  url: string;
  tags: string[]; // e.g., ['frontend', 'javascript', 'react']
  isFavorite?: boolean;
}

export interface UserProfile {
  username: string;
  email: string;
  profilePictureUrl?: string;
}

export interface RoadmapProgress {
  [roadmapId: string]: {
    [moduleId: string]: {
      [itemId: string]: boolean;
    };
  };
}
