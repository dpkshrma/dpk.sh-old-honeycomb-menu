import styled from 'styled-components'

export const TextInput = styled.input`
  font-size: 12px;
  color: #111;
  letter-spacing: 1px;
  padding: 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-weight: 300;
  &::placeholder {
    font-weight: 100;
    color: #777;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`
export const Button = styled.button`
  padding: 0 8px;
  font-size: 12px;
`
