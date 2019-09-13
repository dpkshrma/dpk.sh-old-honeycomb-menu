import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  display: flex;
  fill: #555;
`;

const LoadingIcon = props => {
  return (
    <SVG
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
    >
      <g>
        <circle
          cx="50"
          cy="50"
          fill="none"
          ng-attr-stroke="{{config.color}}"
          ng-attr-stroke-width="{{config.width}}"
          ng-attr-r="{{config.radius}}"
          ng-attr-stroke-dasharray="{{config.dasharray}}"
          strokeWidth="10"
          r="30"
          strokeDasharray="141.37166941154067 49.12388980384689"
          transform="rotate(102 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </SVG>
  );
};

export default LoadingIcon;
