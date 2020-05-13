import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 100%;
    heigth: 100%;
    background: #edeef0;
    margin-top: 4rem
    padding-left: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;


export const TitleContainer = styled.div`
    margin-bottom: 0.75rem;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    margin: 0;
    font-size: .7rem;
    font-weight: none;
    padding: .8rem

    @media (min-width: 40rem){
        font-size: .75rem;
    }
`;

export const ContentContainer = styled.div`
    height: 100vh;
`


export const CardRowContainer = styled.div`
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-left: -0.5rem;
        margin-right: -0.5rem;
        padding: 1rem;
        width: 100%
        background-color: #f6f7f8;
        justify-content: center;
        
`;

export const SingleCardContaier = styled.div`
    margin: 0 0 1rem 0;
    padding: 0 0.7rem;
    min-width: 270px;
    max-width: 350px
`;

export const Card = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;
    background: white;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.09);
    border-radius: 6px;
    transition: all 0.5s ease;
    margin: auto;
    max-width: 250px

   
    @media (min-width: 40rem) {
        height: 340px;
        
    }  
`

export const CardBorder = styled.div`
    border-radius: 6px 6px 0 0;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    border-radius: 6px;
`


export const CardIconContainer = styled.div`
        position: absolute;
        top: 1;
        right: 0;
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
        background: transparent;
        border-radius: 3px;
        transition: all 0.5s ease;
        color: rgb(97, 93, 93);
`

export const CardIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
`

export const CardLogo = styled.img`
position: absolute;
top: 45%;
left: 50%;
transform: translate(-50%, -50%);
width: 72%;
max-width: 150px;
height: auto;
`;


export const CardInfoLeft = styled.div`
        position: absolute;
        bottom: 0.75rem;
        left: .4rem;
        width: 50%;
        font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
        text-align: left;
        width: 100%
        color: #3688e9;

`;

export const CardInfoRight = styled.div`
    position: absolute;
    bottom: 0.75rem;
    right: 1rem;
    width: 50%;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    text-align: right;
    color: #3688e9;
`

