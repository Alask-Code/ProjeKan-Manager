import React from 'react';
import { FiArrowUpRight, FiCheckCircle, FiClock, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useProjectStore from '../../stores/projectStore';

const statusColors: Record<string, string> = {
  progress: 'amber',
  finished: 'emerald',
  continuous: 'blue',
  warning: 'red',
  unstarted: 'stone',
  archived: 'stone'
};

export default function OverviewPage() {
  const projects = useProjectStore((state) => state.projects);
  const count = (status: string) => projects.filter((project) => (project.status ?? 'unstarted') === status).length;
  const active = projects.filter((project) => ['progress', 'continuous'].includes(project.status ?? '')).length;
  const finished = count('finished');
  const completion = projects.length ? Math.round((finished / projects.length) * 100) : 0;
  const stats = [
    { label: 'Total de projetos', value: projects.length, icon: FiLayers, tone: 'green' },
    { label: 'Em andamento', value: active, icon: FiClock, tone: 'blue' },
    { label: 'Concluídos', value: finished, icon: FiCheckCircle, tone: 'yellow' }
  ];
  return (
    <main className="workspace-page">
      <div className="page-intro">
        <div>
          <span className="demo-eyebrow">RESUMO DO ESPAÇO</span>
          <h2>Visão geral</h2>
          <p>Acompanhe o andamento dos seus projetos em um só lugar.</p>
        </div>
        <Link className="text-link" to="/">
          Abrir quadro <FiArrowUpRight />
        </Link>
      </div>
      <section className="stats-grid">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <article className="stat-card" key={label}>
            <span className={`stat-icon ${tone}`}>
              <Icon />
            </span>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </article>
        ))}
      </section>
      <section className="overview-grid">
        <article className="workspace-card progress-card">
          <div className="section-heading">
            <div>
              <h3>Progresso geral</h3>
              <p>Projetos concluídos em relação ao total</p>
            </div>
            <strong>{completion}%</strong>
          </div>
          <div aria-label={`${completion}% concluído`} className="progress-track">
            <span style={{ width: `${completion}%` }} />
          </div>
          <div className="progress-foot">
            <span>{finished} concluídos</span>
            <span>{projects.length - finished} restantes</span>
          </div>
        </article>
        <article className="workspace-card">
          <div className="section-heading">
            <div>
              <h3>Projetos por status</h3>
              <p>Distribuição atual</p>
            </div>
          </div>
          <div className="status-list">
            {[
              ['unstarted', 'Não iniciado'],
              ['progress', 'Em progresso'],
              ['continuous', 'Contínuo'],
              ['finished', 'Finalizado'],
              ['warning', 'Precisa de atenção'],
              ['archived', 'Arquivado']
            ].map(([key, label]) => (
              <div className="status-row" key={key}>
                <span className={`column-dot ${statusColors[key] ?? 'stone'}`} />
                <span>{label}</span>
                <strong>{count(key)}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="workspace-card recent-card">
        <div className="section-heading">
          <div>
            <h3>Projetos recentes</h3>
            <p>Continue de onde você parou</p>
          </div>
          <Link className="text-link" to="/">
            Ver quadro <FiArrowUpRight />
          </Link>
        </div>
        {projects.length ? (
          <div className="recent-list">
            {projects.slice(0, 5).map((project) => (
              <Link className="recent-project" key={project.id} to="/">
                <span className="project-avatar">{project.name.slice(0, 1).toUpperCase()}</span>
                <span className="recent-name">
                  {project.name}
                  <small>{project.description || 'Sem descrição'}</small>
                </span>
                <span className="status-pill">{project.status ?? 'Não iniciado'}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty-state">Seus projetos aparecerão aqui quando você criar o primeiro.</p>
        )}
      </section>
    </main>
  );
}
