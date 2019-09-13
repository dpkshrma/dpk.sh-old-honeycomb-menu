import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  fill: none;
  stroke: #000000;
  stroke-width: 20;
  stroke-miterlimit: 10;
`;

const Icon = props => {
  return (
    <SVG
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="-31 161 369 471"
    >
      <path d="M0.5,575c0,28,22.9,51,51,51h204c28,0,51-23,51-51V269H0.5V575z M332,192.5h-89.3L217.3,167H89.8l-25.5,25.5H-25v51h357V192.5z" />
    </SVG>
  );
};

export default Icon;
