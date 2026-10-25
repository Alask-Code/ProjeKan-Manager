import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import KanbanTable from '../../pages/MainPage/KanbanTable';
import OverviewPage from '../../pages/OverviewPage';

export default function RouteContent() {
  const { pathname } = useLocation();

  const pages: Record<string, ReactNode> = {
    '/': <KanbanTable />,
    '/overview': <OverviewPage />,
    '/backlog': <div>Backlog</div>,
    '/todo': <div>Simple Todo List</div>,
    '/theme-editor': <div>Theme Editor</div>
  };

  return pages[pathname];
}
