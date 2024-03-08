import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      className={`rounded p-2 min-h-20 border border-green bg-gray-100 ${isOver ? 'border-solid' : 'border-dashed'}`}>
      {children}
    </div>
  );
};

export default Droppable;
