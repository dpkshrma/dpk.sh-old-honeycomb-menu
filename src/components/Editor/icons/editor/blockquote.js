import React from 'react';
import styled from 'styled-components';
import highlighted from './highlighted';

const SVG = styled.svg`
  margin: 0 4px;
  cursor: pointer;
  fill: #777;
`;

const BlockquoteIcon = props => {
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
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SVG>
  );
};

export default highlighted(BlockquoteIcon);
