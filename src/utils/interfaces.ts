import { IconType } from 'react-icons';
import { ColumnColor, OverviewStatsColor, ProjectCategory } from './enums';

export interface NavbarItemProps {
  Icon: IconType;
  label: string;
  to: string;
  isMenuExpanded: boolean;
}

export interface ColumnProps {
  label: string;
  color: keyof typeof ColumnColor;
}
export interface ProjectCardProps {
  color: ColumnColor;
  item: ProjectProps;
}
export interface ProjectProps {
  name: string;
  description: string;
  createdAt: number;
  logo: string;
  backgroundImage: string;
  category: keyof typeof ProjectCategory;
  id: number;
  status?: string;
  dueDate?: string;
  priority?: 'Baixa' | 'Média' | 'Alta';
  owner?: string;
  notes?: string;
  updatedAt?: number;
  properties?: ProjectProperty[];
  repositoryUrl?: string;
}
export type ProjectPropertyType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'url' | 'releases';
export interface ReleaseEntry {
  id: string;
  version: string;
  date: string;
  url: string;
  changelogUrl: string;
}
export interface ProjectProperty {
  id: string;
  name: string;
  type: ProjectPropertyType;
  value: string | number | boolean | ReleaseEntry[];
  options?: string[];
}
export interface OverviewStatsProps {
  label: string;
  count: number;
  color: keyof typeof OverviewStatsColor;
}
export interface RadialOverviewProps {
  total: number;
}
