import styled from  'styled-components';

export const ToggleButton = styled.button`
    width: 3rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding-top: 0;
    padding-bottom: 0;
    vertical-align: middle;

    @media (min-width: 40rem){
        display: none;
    }

`
export const ToggleButtonBar = styled.span`
    width: 100%;
    height: 0.2rem;
    background: black;
    display: block;
    margin: 0.6rem 0;
`
