import React from 'react';
import { FiCalendar, FiEdit2, FiExternalLink, FiFlag, FiImage, FiTrash2, FiUser } from 'react-icons/fi';
import type { ProjectCardProps } from '../../../../utils/interfaces';
import { ProjectCategory } from '../../../../utils/enums';
import useProjectDetails from '../../../../hooks/useProjectDetails';
import { columns, ProjectForm } from '../..';
import ProjectProperties from './ProjectProperties';
import useProjectStore from '../../../../stores/projectStore';
import ProjectImageUploadButton from './ProjectImageUploadButton';

function readableDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ProjectCard({ item }: ProjectCardProps) {
  const details = useProjectDetails(item);
  const updateProject = useProjectStore((state) => state.updateProject);
  const statusLabel =
    columns.find((column) => column.key === (item.status ?? 'unstarted'))?.label ?? ProjectCategory[item.category];
  return (
    <>
      <button
        aria-label={`Abrir projeto ${item.name}`}
        className="project-card"
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData('text/plain', String(item.id));
        }}
        onClick={details.open}
        type="button"
      >
        <div className="card-title-row">
          <span className="project-avatar">
            {item.logo ? <img alt="" src={item.logo} /> : item.name.trim().slice(0, 1).toUpperCase()}
          </span>
          <span className="project-card-title">{item.name}</span>
          <span className={`priority-dot priority-${(item.priority ?? 'Média').toLowerCase()}`} />
        </div>
        <p className="project-card-description">{item.description || 'Adicione uma descrição para este projeto.'}</p>
        <div className="card-meta-row">
          <span className="status-pill">{statusLabel}</span>
          <span>
            {item.dueDate
              ? `Entrega ${new Date(`${item.dueDate}T00:00:00`).toLocaleDateString('pt-BR')}`
              : readableDate(item.createdAt)}
          </span>
        </div>
      </button>
      {details.isOpen ? (
        <div
          className="modal-backdrop detail-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) details.close();
          }}
        >
          <article
            aria-labelledby={`project-title-${item.id}`}
            aria-modal="true"
            className="project-modal detail-modal"
            role="dialog"
          >
            <div
              className={`detail-cover ${item.backgroundImage ? 'has-cover-image' : ''}`}
              style={
                item.backgroundImage
                  ? { backgroundImage: `linear-gradient(90deg, #14221d45, #14221d12), url("${item.backgroundImage}")` }
                  : undefined
              }
            >
              <div className="detail-top-actions">
                <ProjectImageUploadButton
                  Icon={FiImage}
                  label="Escolher imagem de capa"
                  onSelect={(image) => updateProject(item.id, { backgroundImage: image })}
                  title="Alterar capa"
                />
                {item.backgroundImage ? (
                  <button
                    aria-label="Remover imagem de capa"
                    className="icon-button"
                    onClick={() => updateProject(item.id, { backgroundImage: '' })}
                    title="Remover capa"
                    type="button"
                  >
                    −
                  </button>
                ) : null}
                <ProjectImageUploadButton
                  Icon={FiUser}
                  label="Escolher logo do projeto"
                  onSelect={(image) => updateProject(item.id, { logo: image })}
                  title="Alterar logo"
                />
                {item.logo ? (
                  <button
                    aria-label="Remover logo"
                    className="icon-button"
                    onClick={() => updateProject(item.id, { logo: '' })}
                    title="Remover logo"
                    type="button"
                  >
                    −
                  </button>
                ) : null}
                <button
                  aria-label="Editar projeto"
                  className="icon-button"
                  onClick={() => {
                    details.setIsEditing(true);
                    details.setIsConfirmingDelete(false);
                  }}
                  type="button"
                >
                  <FiEdit2 />
                </button>
                <button
                  aria-label="Excluir projeto"
                  className="icon-button danger-icon"
                  onClick={() => details.setIsConfirmingDelete(true)}
                  type="button"
                >
                  <FiTrash2 />
                </button>
                <button aria-label="Fechar" className="icon-button" onClick={details.close} type="button">
                  ×
                </button>
              </div>
              <span className="detail-project-avatar">
                {item.logo ? <img alt="Logo do projeto" src={item.logo} /> : item.name.trim().slice(0, 1).toUpperCase()}
              </span>
            </div>
            <div className="detail-content">
              <span className="demo-eyebrow">DETALHES DO PROJETO</span>
              <h2 id={`project-title-${item.id}`}>{item.name}</h2>
              <p className="detail-description">{item.description || 'Este projeto ainda não tem uma descrição.'}</p>
              {details.isEditing ? (
                <div className="inline-edit">
                  <h3>Editar projeto</h3>
                  <ProjectForm initial={item} onCancel={() => details.setIsEditing(false)} onSave={details.save} />
                </div>
              ) : (
                <>
                  <div className="detail-facts">
                    <div>
                      <FiFlag />
                      <span>Status</span>
                      <strong>{statusLabel}</strong>
                    </div>
                    <div>
                      <FiFlag />
                      <span>Prioridade</span>
                      <strong>{item.priority ?? 'Média'}</strong>
                    </div>
                    <div>
                      <FiUser />
                      <span>Responsável</span>
                      <strong>{item.owner || 'Não definido'}</strong>
                    </div>
                    <div>
                      <FiCalendar />
                      <span>Data de entrega</span>
                      <strong>
                        {item.dueDate
                          ? new Date(`${item.dueDate}T00:00:00`).toLocaleDateString('pt-BR')
                          : 'Não definida'}
                      </strong>
                    </div>
                    <div>
                      <FiCalendar />
                      <span>Criado em</span>
                      <strong>{readableDate(item.createdAt)}</strong>
                    </div>
                  </div>
                  {item.repositoryUrl ? (
                    <section className="project-repository">
                      <span>
                        <FiExternalLink /> Repositório
                      </span>
                      <a href={item.repositoryUrl} rel="noreferrer" target="_blank">
                        {item.repositoryUrl}
                      </a>
                    </section>
                  ) : null}
                  <ProjectProperties project={item} />
                  <section className="detail-notes">
                    <h3>Notas</h3>
                    <p>{item.notes || 'Sem notas por enquanto.'}</p>
                  </section>
                  {details.isConfirmingDelete ? (
                    <div className="delete-confirm">
                      <p>
                        Excluir <strong>{item.name}</strong>? Essa ação não pode ser desfeita.
                      </p>
                      <button
                        className="button-secondary"
                        onClick={() => details.setIsConfirmingDelete(false)}
                        type="button"
                      >
                        Cancelar
                      </button>
                      <button className="button-danger" onClick={details.confirmDelete} type="button">
                        Excluir projeto
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
