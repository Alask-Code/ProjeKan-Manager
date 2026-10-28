import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import OverviewPage from '../../pages/OverviewPage';
import BacklogPage from '../../pages/BacklogPage';
import TodoPage from '../../pages/TodoPage';
import ThemeEditorPage from '../../pages/ThemeEditorPage';
import KanbanTable from '../KanbanTable';

export default function RouteContent() {
  const { pathname } = useLocation();

  const pages: Record<string, ReactNode> = {
    '/': <KanbanTable />,
    '/overview': <OverviewPage />,
    '/backlog': <BacklogPage />,
    '/todo': <TodoPage />,
    '/theme-editor': <ThemeEditorPage />
  };

  return <div className="route-content">{pages[pathname]}</div>;
}
