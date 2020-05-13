import styled from "styled-components";

export const LoadingBarWrapper = styled.div`
  position: fixed;
  z-index: 2147483647;
  top: 0;
  left: -6px;
  width: 100%;
  height: 2px;
  background: #1f54b6;
  -moz-border-radius: 1px;
  -webkit-border-radius: 1px;
  border-radius: 1px;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
  -webkit-transition: all 500ms ease-in-out;
  animation: load-bar ${props => props.time ? `${props.time}ms` : '4ms'} 0s infinite;

  @keyframes load-bar {
    0% {
      width: 0%
    }

    100% {
        width: 100%
    }

}

`;
