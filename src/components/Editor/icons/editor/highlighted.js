import React from 'react';

const highlighted = IconComponent => ({ active, ...restProps }) => {
  if (active) {
    return <IconComponent style={{ fill: '#ffa000' }} {...restProps} />;
  }
  return <IconComponent {...restProps} />;
};

export default highlighted;
