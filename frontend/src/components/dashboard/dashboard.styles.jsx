import styled from "styled-components";

export const Container = styled.div`
  max-width: 120rem;
  margin: 8rem auto;
  background-color: white;
  box-shadow: ${props => (props.color ? props.color : "var(--shadow-dark)")};

  min-height: 50rem;
`;

export const Content = styled.div`
  display: flex;
`;

export const MenuContainer = styled.main`
  background-color: #fff;
  background-color: orangered;

  flex: 1;
`;
