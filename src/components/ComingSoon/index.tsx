import React from 'react';

interface ComingSoonProps {
  children?: React.ReactNode;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ children }) => (
  <div className="animate-pulse font-avenirBLO bg-ghost-white text-center text-white text-3xl rounded-lg p-4">
    {children || 'Programmation à venir'}
  </div>
);

export default ComingSoon;
