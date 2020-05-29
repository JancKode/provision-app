import styled from 'styled-components';

export const FooterWrapper = styled.div`
    position: fixed;
    z-index: 1;
    height: 3rem;
    bottom: 0;
    width: 100%
    background-color: white;
    
    & ul {
        text-align: center;
        color: #164193;
    }
    & ul li {
        display: inline-block;
    }
    
`;