import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  margin: 5px 0px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: #1d9bf0;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
  &.error {
    border: 3px solid tomato;
  }
`;

export const Error = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: tomato;
  margin-top: 10px;
`;

export const Switcher = styled.span`
  margin-top: 15px;
  a {
    color: #1d9bf0;
  }
`;