import React, { useState } from 'react';
import { ColumnColor } from '../../../utils/enums';
import type { ColumnProps, ProjectProps } from '../../../utils/interfaces';
import ProjectCard from './ProjectCard';
import type { ProjectStatusKey } from '../../../stores/projectStore';
import useProjectStore from '../../../stores/projectStore';

export default function Column({ label, color, status }: ColumnProps & { status: ProjectStatusKey }) {
  const projects = useProjectStore((state) => state.projects);
  const moveProject = useProjectStore((state) => state.moveProject);
  const [draggingOver, setDraggingOver] = useState(false);
  const items = projects.filter((item) => (item.status ?? 'unstarted') === status);
  return (
    <section
      aria-label={label}
      className={`kanban-column ${draggingOver ? 'is-dragging-over' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDraggingOver(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setDraggingOver(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDraggingOver(false);
        const id = Number(event.dataTransfer.getData('text/plain'));
        if (id) moveProject(id, status);
      }}
    >
      <header className="column-header">
        <span className={`column-dot ${color}`} />
        <h3>{label}</h3>
        <span className="column-count">{items.length}</span>
      </header>
      <div className="column-cards">
        {items.map((item: ProjectProps) => (
          <ProjectCard key={item.id} color={ColumnColor[color]} item={item} />
        ))}
        {items.length === 0 ? <p className="empty-column">Solte um cartão aqui</p> : null}
      </div>
    </section>
  );
}
