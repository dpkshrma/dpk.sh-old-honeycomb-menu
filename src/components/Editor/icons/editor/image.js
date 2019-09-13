import React from 'react';
import styled from 'styled-components';
import highlighted from './highlighted';

const SVG = styled.svg`
  margin: 0 4px;
  cursor: pointer;
  fill: #777;
`;

const ImageIcon = props => {
  return (
    <SVG
      height={24}
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
    >
      <path d="M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z" />
    </SVG>
  );
};

export default highlighted(ImageIcon);
