import React from 'react';
import { OverviewStatsColor } from '../../utils/enums';
import { OverviewStatsProps, RadialOverviewProps } from '../../utils/interfaces';

function RadialOverview({ total }: RadialOverviewProps) {
  return (
    <div className="size-96 min-h-96 max-h-96 min-w-96 max-w-96 p-2 border-2 flex items-center justify-center">
      <div className="bg-conic from-transparent border-2 bg-mauve-400 size-full flex items-center justify-center rounded-full">
        <div className="bg-mauve-950 border-2 gap-2 flex flex-col items-center justify-center size-5/6 rounded-full">
          <p className="text-8xl font-bold">{total}</p>
          <div className="border-4 w-2/4 border-mauve-400!" />
        </div>
      </div>
    </div>
  );
}

function OverviewStats({ label, count, color }: OverviewStatsProps) {
  return (
    <p className={`border-2 w-fit px-2 ${OverviewStatsColor[color]}`}>
      {label}: {count}
    </p>
  );
}

export default function OverviewPage() {
  return (
    <div className="w-full h-full flex flex-col gap-2 border-2 p-2">
      <div className="flex gap-2">
        <RadialOverview total={12} />
        <div className="border-2 p-2 flex flex-col gap-2 w-full">
          <p className="text-4xl font-bold p-2 border-2">Projects Overview</p>
          <div className=" border-2 text-xl h-full flex flex-col gap-2 p-2">
            <OverviewStats color="mauve" label="Total Projects" count={10} />
            <OverviewStats color="stone" label="Unstarted Projects" count={2} />
            <OverviewStats color="yellow" label="In Development" count={2} />
            <OverviewStats color="green" label="Finished Projects" count={2} />
            <OverviewStats color="blue" label="Active Projects" count={2} />
            <OverviewStats color="slate" label="Archived Projects" count={2} />
          </div>
        </div>
      </div>
      <div className="border-2 p-2 h-full flex flex-col gap-2">
        <p className="text-4xl font-bold p-2 border-2">Insights</p>
        <p className="border-2 px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quo quod asperiores repellendus ipsum
          tenetur ipsam commodi quaerat saepe dolore?
        </p>
      </div>
    </div>
  );
}
