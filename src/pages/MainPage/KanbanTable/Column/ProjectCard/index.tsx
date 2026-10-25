import React from 'react';
import { ProjectCardProps } from '../../../../../utils/interfaces';
import { ProjectCategory } from '../../../../../utils/enums';

export default function ProjectCard({ item, color }: ProjectCardProps) {
  const date = new Date(item.createdAt * 1000).toLocaleString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  return (
    <div className="p-2 border-2">
      <div className="flex flex-col items-end gap-2 w-full">
        <img className="border-2" src={item.backgroundImage} alt="" />
        <div className="flex gap-2 w-full items-stretch overflow-hidden">
          <img alt="Project Logo" src={item.logo} className="size-8 border-2" />
          <p className="text-lg w-full flex items-center px-2 border-2">{item.name}</p>
        </div>
        <p className="text-sm px-2 border-2">{item.description}</p>
        <p className="border-2 px-2 w-full flex justify-between items-center">
          Criado em: <span>{date}</span>
        </p>
        <p className={`border-2 w-fit text-xs px-2 text-mauve-400! ${color}`}>{ProjectCategory[item.category]}</p>
      </div>
    </div>
  );
}
