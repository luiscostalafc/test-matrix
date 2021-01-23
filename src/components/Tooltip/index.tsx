import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  classname?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, classname, children }) => {
  return (
    <Container className={classname}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
