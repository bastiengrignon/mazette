import { FaCircleNotch } from 'react-icons/fa';
import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center">
    <FaCircleNotch className="animate-spin" />
  </div>
);

export default Loading;
