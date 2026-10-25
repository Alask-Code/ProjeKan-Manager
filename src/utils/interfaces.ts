import { IconType } from 'react-icons';
import { ColumnColor, OverviewStatsColor, ProjectCategory, ProjectStatus } from './enums';

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
}
export interface OverviewStatsProps {
  label: string;
  count: number;
  color: keyof typeof OverviewStatsColor;
}
export interface RadialOverviewProps {
  total: number;
}
