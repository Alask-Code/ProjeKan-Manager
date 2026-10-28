import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ProjectProps } from '../utils/interfaces';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/bkgImage.png';

export type ProjectStatusKey = 'unstarted' | 'progress' | 'finished' | 'continuous' | 'archived' | 'warning';

const now = Date.now();
const starterProjects: ProjectProps[] = [
  {
    id: 1,
    name: "Outland's Edge",
    description: 'Survive the division, fight for freedom.',
    createdAt: now,
    category: 'in-development',
    status: 'progress',
    priority: 'Alta',
    owner: 'Equipe',
    logo,
    backgroundImage,
    notes: ''
  },
  {
    id: 2,
    name: 'Novo projeto',
    description: 'Organize as primeiras entregas e defina os próximos passos.',
    createdAt: now,
    category: 'unstarted',
    status: 'unstarted',
    priority: 'Média',
    owner: '',
    logo,
    backgroundImage,
    notes: ''
  }
];

interface ProjectStore {
  projects: ProjectProps[];
  addProject: (project: Omit<ProjectProps, 'id' | 'createdAt'>) => number;
  updateProject: (id: number, updates: Partial<ProjectProps>) => void;
  deleteProject: (id: number) => void;
  moveProject: (id: number, status: ProjectStatusKey) => void;
}

const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: starterProjects,
      addProject: (project) => {
        const id = Math.max(0, ...get().projects.map(({ id: projectId }) => projectId)) + 1;
        const timestamp = Date.now();
        set((state) => ({
          projects: [{ ...project, id, createdAt: timestamp, updatedAt: timestamp }, ...state.projects]
        }));
        return id;
      },
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates, updatedAt: Date.now() } : project
          )
        })),
      deleteProject: (id) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
      moveProject: (id, status) =>
        set((state) => ({
          projects: state.projects.map((project) => (project.id === id ? { ...project, status } : project))
        }))
    }),
    { name: 'projekan-projects', storage: createJSONStorage(() => localStorage), version: 1 }
  )
);

export default useProjectStore;
