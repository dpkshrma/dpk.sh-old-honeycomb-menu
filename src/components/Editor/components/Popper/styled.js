import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`
export const Target = styled.div`
  cursor: pointer;
  display: flex;
`
export const Img = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  border: 1px solid #ccc;
`
export const Menu = styled.div`
  position: absolute;
  top: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  z-index: 199;
  display: flex;
  flex-direction: column;
  ${props =>
    props.alignRight &&
    `
    right: 0;
    ${MenuItem} {
      text-align: right;
    };
  `};
`
export const MenuItem = styled(Link)`
  cursor: pointer;
  color: #555;
  min-width: 80px;
  padding: 8px;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: #222;
    background: #f5f5f5;
  }
  &:first-child {
    margin-top: 8px;
  }
  &:last-child {
    margin-bottom: 8px;
  }
`
export const LogoutButton = MenuItem.withComponent('div')
export const Tip = styled.div`
  position: absolute;
  height: 8px;
  width: 8px;
  transform: rotate(135deg);
  position: absolute;
  bottom: -11px;
  right: 24px;
  background: #fff;
  border-left: 1px solid;
  border-bottom: 1px solid;
  border-color: #ccc;
  z-index: 1001;
`
