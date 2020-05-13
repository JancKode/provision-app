import styled from 'styled-components';


export const SideBarContainer = styled.div`
    display: flex;
    margin:0;
    padding:0;
    width: 100%;
`;


export const SideBar = styled.div`
    display: none;
    width: 30vw;
    max-width: 280px;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    background: white;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.09);
    list-style: none;
    min-height: 100vh;
    margin-top: 4rem;
    min-width: 10vw;

    @media (min-width: 40rem) {
        display: flex;
    }

`

export const SideBarNotif = styled.span`
            position: relative;
            right: 1.7rem;
            top: .6rem;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
            background: #20c466;
            border-radius: 50%;
            float: right;
`