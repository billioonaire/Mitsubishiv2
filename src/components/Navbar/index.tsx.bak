import React from 'react'
import { useSelector } from 'react-redux'

import {
    Container,
    WalletAddress,
    Logo,
    LinkContainer,
    Link,
    Redirect,
    WalletPrefix
} from './NavbarElements'

import LogoImg from '../../img/Dragon Deez Text.png'
import TwitterImg from '../../img/Twitter Link.png'
import OpenSeaImg from '../../img/Opensea Link.png'
import TwitterHover from '../../img/Twitter Link Hover.png'
import OpenSeaHover from '../../img/Opensea Link Hover.png'


const Navbar: React.FC = () => {

  const walletAddress = useSelector((state: any) => state.wallet.address);
  const walletValue = useSelector((state: any) => state.wallet.value);

  return (
    <Container>
      <Logo src={LogoImg} />
      <WalletAddress className={walletValue ? 'active' : ''}><WalletPrefix>Connected Wallet: </WalletPrefix>{walletAddress}</WalletAddress>
      <LinkContainer>
        <Redirect href='https://twitter.com/DragonDeezNFT' target='_blank'>
          <Link src={TwitterImg}
            onMouseEnter={(x) => (x.currentTarget.src = TwitterHover)}
            onMouseLeave={(x) => (x.currentTarget.src = TwitterImg)}
          />
        </Redirect>
        <Redirect href='https://opensea.io/collection/dragondeeznft' target='_blank'>
          <Link src={OpenSeaImg}
            onMouseEnter={(x) => (x.currentTarget.src = OpenSeaHover)}
            onMouseLeave={(x) => (x.currentTarget.src = OpenSeaImg)}
          />
        </Redirect>
      </LinkContainer>
    </Container>
  )
}

export default Navbar
