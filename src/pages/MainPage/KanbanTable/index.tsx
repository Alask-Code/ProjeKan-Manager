import React from 'react';
import Column from './Column';

export default function KanbanTable() {
  return (
    <div className="grid grid-cols-6 gap-2 border-2 p-2 w-full h-full overflow-auto">
      <Column label="Não Iniciado" color="stone" />
      <Column label="Em Progresso" color="amber" />
      <Column label="Finalizado" color="emerald" />
      <Column label="Desenvolvimento Continuo" color="blue" />
      <Column label="Arquivados" color="black" />
      <Column label="Precisa de Atenção" color="red" />
    </div>
  );
}
