import React, { FormEvent, useState } from 'react';
import { FiCheck, FiPlus, FiTrash2 } from 'react-icons/fi';
import useTodoStore from '../../stores/todoStore';

export default function TodoPage() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const [text, setText] = useState('');
  const completed = todos.filter((todo) => todo.done).length;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;
    addTodo(text.trim());
    setText('');
  };
  return (
    <main className="workspace-page todo-page">
      <div className="page-intro">
        <div>
          <span className="demo-eyebrow">FOCO DO DIA</span>
          <h2>Lista de tarefas</h2>
          <p>Anote pequenas ações e marque cada uma ao concluir.</p>
        </div>
        <div className="todo-progress">
          <strong>
            {completed}/{todos.length}
          </strong>
          <span>concluídas</span>
        </div>
      </div>
      <section className="workspace-card todo-panel">
        <form className="todo-entry" onSubmit={submit}>
          <input
            aria-label="Nova tarefa"
            onChange={(event) => setText(event.target.value)}
            placeholder="Escreva uma tarefa e pressione Enter"
            value={text}
          />
          <button aria-label="Adicionar tarefa" className="button-primary" type="submit">
            <FiPlus /> Adicionar
          </button>
        </form>
        <div className="todo-list-heading">
          <h3>Suas tarefas</h3>
          {completed > 0 ? (
            <button className="subtle-button" onClick={clearCompleted} type="button">
              Limpar concluídas
            </button>
          ) : null}
        </div>
        {todos.length ? (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className={todo.done ? 'todo-item is-done' : 'todo-item'} key={todo.id}>
                <button
                  aria-checked={todo.done}
                  aria-label={todo.done ? `Marcar ${todo.text} como pendente` : `Concluir ${todo.text}`}
                  className="todo-check"
                  onClick={() => toggleTodo(todo.id)}
                  role="checkbox"
                  type="button"
                >
                  {todo.done ? <FiCheck /> : null}
                </button>
                <span>{todo.text}</span>
                <button
                  aria-label={`Excluir ${todo.text}`}
                  className="todo-delete"
                  onClick={() => removeTodo(todo.id)}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="todo-empty">
            <span>✓</span>
            <strong>Nenhuma tarefa por aqui</strong>
            <p>Adicione a primeira tarefa para organizar seu dia.</p>
          </div>
        )}
        {todos.length > 0 ? (
          <div className="todo-footer">
            {todos.length - completed} pendente{todos.length - completed === 1 ? '' : 's'} · salvas neste dispositivo
          </div>
        ) : null}
      </section>
    </main>
  );
}
