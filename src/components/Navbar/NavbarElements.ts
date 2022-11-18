import styled from "styled-components";

export const Container = styled.nav`
    height: 100px;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;

    background: rgba( 255, 255, 255, 0.25 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );

    @media screen and (max-width: 1040px) {
        justify-content: center;
    }
`

export const WalletAddress = styled.p`
    display: none;

    &.active {
        display: block;
        color: white;
        font-size: 1.5rem;
        align-self: center;
        color: black;
        font-family: 'Rubik';

        @media screen and (max-width: 1820px) {
        display: none;
    }
    }


`

export const WalletPrefix = styled.span`
    color: black;
    font-family: 'Rubik';
    font-weight: bold;
`

export const Logo = styled.img`
    height: auto;
    max-width: 512px;
    min-width: 0;

    @media screen and (max-width: 1040px) {
        display: none;
    }

`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

export const Redirect = styled.a`

`

export const Link = styled.img`
    height: auto;
    max-width: 250px;
    width: 100%;
    min-width: 0;
`
