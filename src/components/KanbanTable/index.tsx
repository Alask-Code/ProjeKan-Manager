import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Column from './Column';
import useProjectStore from '../../stores/projectStore';
import type { ProjectProps } from '../../utils/interfaces';
import Dropdown from '../Dropdown';

export const columns = [
  { key: 'unstarted', label: 'Não iniciado', color: 'stone' },
  { key: 'progress', label: 'Em progresso', color: 'amber' },
  { key: 'finished', label: 'Finalizado', color: 'emerald' },
  { key: 'continuous', label: 'Contínuo', color: 'blue' },
  { key: 'archived', label: 'Arquivados', color: 'black' },
  { key: 'warning', label: 'Atenção', color: 'red' }
] as const;

export function ProjectForm({
  initial,
  onSave,
  onCancel
}: {
  initial?: ProjectProps;
  onSave: (project: Omit<ProjectProps, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [status, setStatus] = useState(initial?.status ?? 'unstarted');
  const [priority, setPriority] = useState<ProjectProps['priority']>(initial?.priority ?? 'Média');
  const [owner, setOwner] = useState(initial?.owner ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [repositoryUrl, setRepositoryUrl] = useState(initial?.repositoryUrl ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [error, setError] = useState('');
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Informe o nome do projeto.');
      return;
    }
    let category: ProjectProps['category'] = 'in-development';
    if (status === 'finished') category = 'finished';
    if (status === 'unstarted') category = 'unstarted';
    onSave({
      ...initial,
      name: name.trim(),
      description: description.trim(),
      status,
      category,
      priority,
      owner: owner.trim(),
      dueDate,
      repositoryUrl: repositoryUrl.trim(),
      notes,
      logo: initial?.logo ?? '',
      backgroundImage: initial?.backgroundImage ?? ''
    });
  };
  return (
    <form onSubmit={submit} className="project-form">
      <label htmlFor="project-name">
        Nome do projeto
        <input
          id="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Lançamento do produto"
        />
      </label>
      <label htmlFor="project-description">
        Descrição
        <textarea
          id="project-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Qual é o objetivo deste projeto?"
        />
      </label>
      <div className="form-row">
        <div className="project-form-field">
          <span>Status</span>
          <Dropdown
            ariaLabel="Status do projeto"
            onChange={setStatus}
            options={columns.map((column) => ({ value: column.key, label: column.label }))}
            value={status}
          />
        </div>
        <div className="project-form-field">
          <span>Prioridade</span>
          <Dropdown
            ariaLabel="Prioridade do projeto"
            onChange={(value) => setPriority(value as ProjectProps['priority'])}
            options={[
              { value: 'Baixa', label: 'Baixa' },
              { value: 'Média', label: 'Média' },
              { value: 'Alta', label: 'Alta' }
            ]}
            value={priority ?? 'Média'}
          />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="project-owner">
          Responsável
          <input id="project-owner" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Nome" />
        </label>
        <label htmlFor="project-due-date">
          Data de entrega
          <input id="project-due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
      </div>
      <label htmlFor="project-repository-url">
        Repositório (opcional)
        <input
          id="project-repository-url"
          autoComplete="url"
          onChange={(e) => setRepositoryUrl(e.target.value)}
          placeholder="https://github.com/usuario/projeto"
          type="url"
          value={repositoryUrl}
        />
      </label>
      <label htmlFor="project-notes">
        Notas
        <textarea
          id="project-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Links, decisões e informações úteis"
        />
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="modal-actions">
        <button className="button-secondary" onClick={onCancel} type="button">
          Cancelar
        </button>
        <button className="button-primary" type="submit">
          {initial ? 'Salvar alterações' : 'Criar projeto'}
        </button>
      </div>
    </form>
  );
}

export default function KanbanTable() {
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const [creating, setCreating] = useState(false);
  return (
    <section className="kanban-page">
      <div className="kanban-toolbar">
        <div>
          <span className="demo-eyebrow">VISÃO GERAL</span>
          <h2>Seus projetos</h2>
          <p>
            {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'} · arraste os cartões para atualizar o
            status
          </p>
        </div>
        <button className="button-primary" onClick={() => setCreating(true)} type="button">
          <FiPlus /> Novo projeto
        </button>
      </div>
      <div className="kanban-board">
        {columns.map((column) => (
          <Column key={column.key} label={column.label} color={column.color} status={column.key} />
        ))}
      </div>
      {creating ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCreating(false);
          }}
        >
          <section aria-labelledby="create-title" aria-modal="true" className="project-modal form-modal" role="dialog">
            <div className="modal-header">
              <div>
                <span className="demo-eyebrow">NOVO ESPAÇO DE TRABALHO</span>
                <h2 id="create-title">Criar projeto</h2>
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
    </section>
  );
}
