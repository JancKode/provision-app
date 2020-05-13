import styled from 'styled-components';


export const OrderStatusContainer = styled.div`
        width: 100%;
        heigth: 100%;
        background: #edeef0;
        margin-top: 4rem
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-left: 1rem;
        margin-right: 1rem;
`;


export const OrderStatusInfoWrapper = styled.div`
    width: inherit;
`;

export const TitleContainer = styled.div`
    margin-bottom: 0.75rem;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    margin: 0;
    font-size: .7rem;
    font-weight: normal;
    padding: .8rem

    @media (min-width: 40rem){
        font-size: .75rem;
    }
`;

export const OrderStatusInfoContainer = styled.div`
    cursor: initial;
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
`;

export const InfoContainer = styled.div`
    margin: 0 0.5rem;
    height: 36px;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: bold;
`;

export const InfoDetailsContainer = styled.div`
    padding: 1rem;
    font-size: 14px;
    background: white;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.09);
    width: 52vw;
    margin-top: 4rem
    
    @media (min-width: 40rem){
        margin-top: 0;
    }
`;

export const CatalogueImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40vh;
    background: white;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.09);
    border-radius: 6px;
    transition: all 0.5s ease;
    cursor: pointer;
    margin-top: 1.2rem;
    
`;

export const FormInputContainer = styled.div`
`