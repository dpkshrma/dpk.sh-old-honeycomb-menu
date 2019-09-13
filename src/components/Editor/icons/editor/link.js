import React from 'react';
import styled from 'styled-components';
import highlighted from './highlighted';

const SVG = styled.svg`
  margin: 0 4px;
  cursor: pointer;
  fill: #777;
  transform: rotate(-45deg);
`;

const LinkIcon = props => {
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
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </SVG>
  );
};

export default highlighted(LinkIcon);
