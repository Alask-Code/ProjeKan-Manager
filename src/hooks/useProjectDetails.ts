import { useCallback, useEffect, useState } from 'react';
import useProjectStore from '../stores/projectStore';
import type { ProjectProps } from '../utils/interfaces';

export default function useProjectDetails(project: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const updateProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const close = useCallback(() => {
    setIsOpen(false);
    setIsEditing(false);
    setIsConfirmingDelete(false);
  }, []);
  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [close, isOpen]);
  const save = (updates: Partial<ProjectProps>) => {
    updateProject(project.id, updates);
    setIsEditing(false);
  };
  const confirmDelete = () => {
    deleteProject(project.id);
    close();
  };
  return {
    isOpen,
    open: () => setIsOpen(true),
    close,
    isEditing,
    setIsEditing,
    isConfirmingDelete,
    setIsConfirmingDelete,
    save,
    confirmDelete
  };
}
