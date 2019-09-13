import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  fill: #777;
  transform: translate(0px, 4px);
  margin-left: 4px;
  margin-right: 4px;
`;

const MouseIcon = props => {
  return (
    <SVG
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z" />
    </SVG>
  );
};

export default MouseIcon;
