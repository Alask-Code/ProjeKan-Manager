import React from 'react';
import { ColumnColor } from '../../../../utils/enums';
import { ColumnProps, ProjectProps } from '../../../../utils/interfaces';
import ProjectCard from './ProjectCard';

import logo from '../../../../assets/logo.png';
import backgroundImage from '../../../../assets/bkgImage.png';

export default function Column({ label, color }: ColumnProps) {
  return (
    <div className=" overflow-auto flex flex-col gap-2">
      <p className={`text-2xl font-bold px-2 ${ColumnColor[color]} border-2 flex items-end`}>{label}</p>
      <div
        className="flex flex-col p-2 overflow-auto border-2
      scrollbar-thin scrollbar-thumb-mauve-400"
      >
        <div className="flex flex-col gap-2">
          {Array.from(
            { length: 7 },
            (_, index): ProjectProps => ({
              id: index + 1,
              category: 'in-development',
              description: 'Survive the division, fight for the freedom.',
              name: `Outland's Edge`,
              createdAt: 1792902506,
              backgroundImage,
              logo
            })
          ).map((item) => {
            return <ProjectCard key={item.id} color={ColumnColor[color]} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
