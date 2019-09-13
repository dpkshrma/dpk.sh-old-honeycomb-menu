import React from 'react';
import styled from 'styled-components';
import octocat from './octocat.jpg';

const Img = styled.img``;

const GithubIcon = props => {
  return <Img src={octocat} {...props} />;
};

export default GithubIcon;
