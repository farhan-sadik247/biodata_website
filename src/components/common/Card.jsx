'use client';

import React from 'react';
import '@/styles/components/_card.scss';

const Card = ({ children, variant = 'default', className = '', ...props }) => {
  const cardClasses = [
    'card',
    variant === 'glass' && 'card--glass',
    variant === 'hover' && 'card--hover',
    variant === 'compact' && 'card--compact',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.Header = ({ children }) => <div className="card__header">{children}</div>;
Card.Header.displayName = 'Card.Header';

Card.Body = ({ children }) => <div className="card__body">{children}</div>;
Card.Body.displayName = 'Card.Body';

Card.Footer = ({ children }) => <div className="card__footer">{children}</div>;
Card.Footer.displayName = 'Card.Footer';

export default Card;
