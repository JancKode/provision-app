import styled from "styled-components";


export const NavBar = styled.header`
    background: white;
    display: flex;
    padding: .6rem 1rem;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed; 
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    font: inherit;
`;

export const ToggleBar = styled.button`

    @media(min-width: 40rem){
        display: none
    }
`


export const ProfileArea = styled.div`
        position: relative
        right: 1rem;
        height: 100%;
        font-family: "Roboto Condensed";
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
`

export const ProfileInfo = styled.div`
    text-align: right;
    position: relative;

`

export const ProfileName = styled.span`
    font-weight: bold;
    margin-right: 0.5rem;
    position: relative;
    right: 3rem;
`

export const ProfileWrapper = styled.div`
    position: absolute;
    top: 1rem;
    right: -.5rem;
    transform: translateY(-50%);
    width: 3.1rem;
    height: 3.1rem;
    background: #1f54b6;
    border-radius: 50%;   
    vertical-align: middle;
    text-align: center;
`

export const InitialsWrapper = styled.p`
    font-size: 1.2rem;
    height: 100%;
    display: inline-block;
    color: white;
    position: relative;
    text-align: center;
    top: .9rem;
    
  
`