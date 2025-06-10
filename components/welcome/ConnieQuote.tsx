import React from 'react';
import Icon from '../shared/Icon';

const ConnieQuote: React.FC = () => {
  return (
    <div className="mt-6 bg-secondary-DEFAULT/10 dark:bg-secondary-dark/20 p-4 rounded-lg flex items-center gap-4">
      <Icon name="robot" className="text-2xl text-secondary-dark dark:text-secondary-light flex-shrink-0" />
      <p className="text-sm italic text-secondary-dark dark:text-secondary-light">
        "¿Listo para crear tu primer meme? ¡Estoy aquí para ayudarte!"
      </p>
    </div>
  );
};

export default ConnieQuote;
