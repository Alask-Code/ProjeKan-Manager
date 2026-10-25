import type { ComponentType } from 'react';
import MainPage from './MainPage';

const routes: {
  path: string;
  Component: ComponentType;
}[] = [
  { path: '/', Component: MainPage },
  { path: '/overview', Component: MainPage },
  { path: '/backlog', Component: MainPage },
  { path: '/todo', Component: MainPage },
  { path: '/theme-editor', Component: MainPage }
];
export default routes;
