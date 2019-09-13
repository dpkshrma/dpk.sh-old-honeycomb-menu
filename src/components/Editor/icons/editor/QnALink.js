import React from 'react';
import styled from 'styled-components';
import highlighted from './highlighted';

const SVG = styled.svg`
  margin: 0 4px;
  cursor: pointer;
  fill: none;
  stroke: #787878;
  stroke-width: 5;
`;

const QnALinkIcon = props => {
  return (
    <SVG
      height={21}
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 61.3 66.5"
    >
      <path d="M41.5,36.3l16.7-17.4c0.2-0.2,0.3-0.4,0.3-0.7l0.3-9c0-0.5-0.3-0.9-0.8-1L25.1,2.5c-0.2,0-0.5,0-0.7,0.1L3,14.8
      	c-0.3,0.2-0.5,0.6-0.5,0.9l0.7,9.8c0,0.4,0.3,0.8,0.7,0.9l36.5,10.2C40.8,36.7,41.2,36.6,41.5,36.3z" />
      <path d="M55,41c1.4,0,2.4,0.9,2.5,1.9l-0.1,1.7c0,0.2-0.1,0.4-0.2,0.6l-15,18.4c-0.3,0.3-0.7,0.4-1.1,0.3L6.3,52.1
      	c-0.4-0.1-0.6-0.5-0.7-0.9l-0.4-5.1c-0.1-0.7,1.3-1,2.6-1" />
      <path d="M6,31.7c-1.4,0.1-2.4,1.3-2.4,2l0.4,4.8c0,0.4,0.3,0.8,0.7,0.9l36.2,11.2c0.4,0.1,0.8,0,1-0.3l15.4-17.6
      	c0.2-0.2,0.2-0.4,0.2-0.6l0-2.9c0-0.9-0.6-1.9-2.4-1.9" />
    </SVG>
  );
};

export default highlighted(QnALinkIcon);
