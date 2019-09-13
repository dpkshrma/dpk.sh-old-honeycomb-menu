import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg``;

const StackExchangeIcon = props => {
  return (
    <SVG
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 120 120"
    >
      <rect x="22.4" y="57.5" width="74.8" height="15.4" fill="#376DB6" />
      <rect x="22.4" y="37.6" width="74.8" height="15.4" fill="#4CA2DA" />
      <path
        d="M85.5,17H34.4c-6.6,0-12,5.5-12,12.3v4h74.8v-4C97.2,22.5,92,17,85.5,17z"
        fill="#91D8F4"
      />
      <path
        d="M22.4,77.3v4c0,6.8,5.4,12.3,12,12.3h32v16.3l15.8-16.3h3.5c6.6,0,12-5.5,12-12.3v-4H22.4z"
        fill="#1E5397"
      />
    </SVG>
  );
};

export default StackExchangeIcon;
