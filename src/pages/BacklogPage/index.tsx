import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import ProjectCard from '../../components/KanbanTable/Column/ProjectCard';
import { ProjectForm } from '../../components/KanbanTable';
import useProjectStore from '../../stores/projectStore';
import type { ProjectProps } from '../../utils/interfaces';
import { ColumnColor } from '../../utils/enums';

export default function BacklogPage() {
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const [creating, setCreating] = useState(false);
  const backlog = projects.filter((project) => (project.status ?? 'unstarted') === 'unstarted');
  return (
    <main className="workspace-page">
      <div className="page-intro">
        <div>
          <span className="demo-eyebrow">IDEIAS E PRÓXIMOS PASSOS</span>
          <h2>Backlog</h2>
          <p>Projetos aguardando planejamento ou início.</p>
        </div>
        <button className="button-primary" onClick={() => setCreating(true)} type="button">
          <FiPlus /> Adicionar projeto
        </button>
      </div>
      <section className="backlog-summary">
        <span className="summary-number">{backlog.length}</span>
        <span>
          <strong>{backlog.length === 1 ? 'projeto no backlog' : 'projetos no backlog'}</strong>
          <small>Itens na coluna “Não iniciado” do quadro</small>
        </span>
      </section>
      {backlog.length ? (
        <div className="backlog-grid">
          {backlog.map((project: ProjectProps) => (
            <ProjectCard key={project.id} color={ColumnColor.stone} item={project} />
          ))}
        </div>
      ) : (
        <section className="workspace-card empty-large">
          <span className="empty-illustration">✦</span>
          <h3>Backlog em dia</h3>
          <p>Não há projetos aguardando início. Crie um projeto ou mova um existente para cá.</p>
          <button className="button-primary" onClick={() => setCreating(true)} type="button">
            <FiPlus /> Criar projeto
          </button>
        </section>
      )}
      {creating ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCreating(false);
          }}
        >
          <section
            aria-labelledby="backlog-create-title"
            aria-modal="true"
            className="project-modal form-modal"
            role="dialog"
          >
            <div className="modal-header">
              <div>
                <span className="demo-eyebrow">BACKLOG</span>
                <h2 id="backlog-create-title">Novo projeto</h2>
              </div>
              <button aria-label="Fechar" className="icon-button" onClick={() => setCreating(false)} type="button">
                ×
              </button>
            </div>
            <ProjectForm
              onCancel={() => setCreating(false)}
              onSave={(project) => {
                addProject(project);
                setCreating(false);
              }}
            />
          </section>
        </div>
      ) : null}
    </main>
  );
}
