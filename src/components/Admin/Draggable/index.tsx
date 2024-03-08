import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import TinyMceEditor from '../TinyMceEditor';
import { TbArrowBackUp, TbDeviceFloppy, TbEdit, TbEye, TbEyeOff, TbGripVertical, TbX } from 'react-icons/tb';
import { Flex, Popconfirm } from 'antd';
import { CONFIRM_DELETE_TITLE } from './Draggable.constants';

interface DraggableProps {
  id: string;
  content: string;
  isVisible: boolean;
  onRemove: (id: string) => void;
  onSave?: (id: string, content: string) => void;
  toggleVisibility?: (id: string) => void;
}

const Draggable: React.FC<DraggableProps> = ({ id, content, isVisible, onRemove, onSave, toggleVisibility }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<string>(content);

  const saveContent = () => {
    onSave && onSave(id, contentValue);
    setIsEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-4 min-h-20 border rounded inline-flex relative group ${isVisible ? 'border-green' : 'border-gray-300 shadow-inherit'} ${isDragging ? 'shadow-xl' : 'shadow-md'}`}>
      <div className="absolute top-0 bottom-0 right-6 hidden group-hover:flex items-center">
        <Popconfirm title={CONFIRM_DELETE_TITLE} onConfirm={() => onRemove(id)} okButtonProps={{ className: 'button' }}>
          <TbX size={20} className="hover:text-red" />
        </Popconfirm>
        {isEditing ? (
          <Flex align="center">
            <TbArrowBackUp size={20} className="hover:text-blue-500" onClick={() => setIsEditing(false)} />
            <TbDeviceFloppy size={20} className="hover:text-blue-700" onClick={saveContent} />
          </Flex>
        ) : (
          <TbEdit size={20} className="hover:text-slate-400" onClick={() => setIsEditing(!isEditing)} />
        )}
      </div>
      <div className="absolute top-0 bottom-0 right-1 flex items-center">
        {isVisible ? (
          <TbEye
            size={20}
            className="absolute top-1 right-0 hover:text-green hidden group-hover:flex"
            onClick={() => toggleVisibility && toggleVisibility(id)}
          />
        ) : (
          <TbEyeOff
            size={20}
            className="absolute top-1 right-0 hover:text-green hidden group-hover:flex"
            onClick={() => toggleVisibility && toggleVisibility(id)}
          />
        )}

        <TbGripVertical
          size={20}
          className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${isEditing ? 'cursor-not-allowed' : 'hover:text-green'}`}
          {...listeners}
        />
      </div>
      {isEditing ? (
        <TinyMceEditor textareaName="text" initialValue={content} minHeight={300} onChange={setContentValue} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </li>
  );
};

export default Draggable;
