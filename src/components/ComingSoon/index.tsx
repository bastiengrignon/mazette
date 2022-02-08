import React from 'react'

const ComingSoon: React.FC = ({ children }) => (
    <div className="animate-pulse font-avenirBLO bg-ghost-white text-center text-white text-3xl rounded-lg p-4">
        {children || 'Programmation à venir'}
    </div>
)

export default ComingSoon