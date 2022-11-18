import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../../abi.json";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";

import { incriment, decriment } from "../../app/features/setCount";
import { setAddress } from "../../app/features/setWallet";

import {
  Container,
  ConnectButton,
  MintContainer,
  MintButton,
  QuanityContainer,
  QuanityButton,
  AmountContainer,
  AmountDisplay,
  Amount,
  GifLoop,
  NotWhitelisted,
} from "./MainElements";

import ConnectButtonImg from "../../img/Connect.png";
import ConnectHoverImg from "../../img/Connect Hover.png";
import MintButtonImg from "../../img/Mint.png";
import MintHoverImg from "../../img/Mint Hover.png";
import BoardImg from "../../img/Board Shape.png";
import PlusImg from "../../img/Plus.png";
import PlusHoverImg from "../../img/Plus Hover.png";
import MinusImg from "../../img/Minus.png";
import MinusHoverImg from "../../img/Minus Hover.png";
import Loop from "../../img/Examples Combined.gif";
import NoWhitelist from "../../img/No Whitelist.png";

import * as data from "../../data.json";

let provider;
let signer;
let contract: any;

let maxMint: number;
let minMint: number = 1;

const publicMint = false;

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const CONTRACT_ADDRESS = "0x23e025f13D1303C3C4B73280767f63e0f94A48F9";

window.Buffer = window.Buffer || Buffer;

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: any) => state.wallet.address);

  const [showConnectButton, setShowConnectButton] = useState(true);
  const [showMintButton, setShowMintButton] = useState(false);
  const [showPublicButton, setShowPublicButton] = useState(false);
  const [showVIPButton, setShowVIPButton] = useState(false);
  const [showWhitelistButton, setShowWhitelistButton] = useState(false);

  const accountChangeHandler = (account: string) => {
    setShowConnectButton(false);

    console.log(isWhitelisted('Whitelist', account))

    if (publicMint) {
      dispatch(setAddress(account));
      setShowPublicButton(true);
      setShowMintButton(true);
      maxMint = 2;
    } else if (isWhitelisted('Whitelist', account) && !isWhitelisted('VIP', account)) {
      dispatch(setAddress(account));
      setShowWhitelistButton(true);
      setShowMintButton(true);
      maxMint = 2;
    } else if (isWhitelisted('VIP', account)) {
      dispatch(setAddress(account));
      setShowVIPButton(true);
      setShowMintButton(true);
      maxMint = 2;
    } else {
      dispatch(setAddress(account));
    }
  };

  const onClickConnectWallet = async () => {
    if (window.ethereum) {
      // res[0] for fetching a first wallet

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: string) => {
          accountChangeHandler(res[0]);
          provider = new ethers.providers.Web3Provider(window.ethereum);
          signer = provider.getSigner();
          contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        });
    } else {
      alert("Install the MetaMask extension.");
    }
  };

  const getProof = (type: string, address: string) => {

    console.log("getting proof")

    try {
      let whitelistAddresses: string[] = data[type as keyof typeof data].whitelist;

      //console.log(whitelistAddresses)

      const spot = whitelistAddresses.findIndex(
        (addr) => addr.toLowerCase() === address
      );

      console.log("I RAN")

      console.log("Whitelisted Wallets: " + whitelistAddresses)

      let leafNodes : any[] = whitelistAddresses.map((addr) => keccak256(addr));
      console.log("I RAN2")

        console.log(leafNodes);

      let merkleTree = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
      });

      const claimingAddress = leafNodes[spot];

      const hexProof = merkleTree.getHexProof(claimingAddress);

      console.log(hexProof);

      return hexProof;
    } catch (e) {
      return false;
    }
  };

  function isWhitelisted(type: string, address: string) {
    try {

      console.log("I RAN")
      console.log(type)
      console.log(data)
      let whitelistAddresses: string[] = data[type as keyof typeof data].whitelist;
      console.log("I RAN2")

      console.log(whitelistAddresses)

      let spot = whitelistAddresses.findIndex(
        (addr) => addr.toLowerCase() === address
      );

      console.log(whitelistAddresses)

      if (spot !== -1) {
        return true;
      } else {
        return false;
      }

    } catch (e) {
      return false;
    }
  }

  const mint = async (
    type: string,
    proof: any,
    quantity: number,
  ) => {
    let result;
    switch (type) {
      case 'VIP':
        console.log("Whitelist");
        result = await contract.whitelistMint(quantity, proof, {
          value: ethers.utils.parseEther(
            (String(parseFloat(data[type as keyof typeof data].cost) * quantity))
          ),
        });
        break;
      case 'Public':
        result = await contract.mint(quantity, {
          value: ethers.utils.parseEther(
            (String(parseFloat(data[type as keyof typeof data].cost) * quantity))
          ),
        });
        break;
      case 'Whitelist':
        console.log("Whitelist");
        result = await contract.whitelistMint(quantity, proof, {
          value: ethers.utils.parseEther(
            (String(parseFloat(data[type as keyof typeof data].cost) * quantity))
          ),
        });
        break;
      default:
        break;
    }
  };

  const count = useSelector((state: any) => state.counter.count);

  const incrimentCount = () => {
    if (count < maxMint) {
      dispatch(incriment());
    }
  };

  const decrimentCount = () => {
    if (count > minMint) {
      dispatch(decriment());
    }
  };

  return (
    <>
      <Container>
        <ConnectButton
          src={ConnectButtonImg}
          className={showConnectButton ? "active" : ""}
          onClick={onClickConnectWallet}
          onMouseEnter={(x) => (x.currentTarget.src = ConnectHoverImg)}
          onMouseLeave={(x) => (x.currentTarget.src = ConnectButtonImg)}
        />
        <MintContainer
          className={showConnectButton ? "" : "active"}
          id="mintcontainer">
          <GifLoop src={Loop} />
          <QuanityContainer>
            <QuanityButton
              src={MinusImg}
              onMouseEnter={(x) => (x.currentTarget.src = MinusHoverImg)}
              onMouseLeave={(x) => (x.currentTarget.src = MinusImg)}
              onClick={decrimentCount}
            />
            <AmountContainer>
              <AmountDisplay src={BoardImg} />
              <Amount>{count}</Amount>
            </AmountContainer>
            <QuanityButton
              src={PlusImg}
              onMouseEnter={(x) => (x.currentTarget.src = PlusHoverImg)}
              onMouseLeave={(x) => (x.currentTarget.src = PlusImg)}
              onClick={incrimentCount}
            />
          </QuanityContainer>
          <NotWhitelisted
            className={showMintButton ? "" : "active"}
            src={NoWhitelist}
          />
          <MintButton
            src={MintButtonImg}
            className={showPublicButton ? "" : "active"}
            onMouseEnter={(x) => (x.currentTarget.src = MintHoverImg)}
            onMouseLeave={(x) => (x.currentTarget.src = MintButtonImg)}
            onClick={async () => {
              if (!walletAddress) {
                alert("Connect a wallet first!");
              } else {
                const proof = getProof("Public", walletAddress);
                await mint("Public", null, count);
              }
            }}
          />
          <MintButton
            src={MintButtonImg}
            className={showVIPButton ? "" : "active"}
            onMouseEnter={(x) => (x.currentTarget.src = MintHoverImg)}
            onMouseLeave={(x) => (x.currentTarget.src = MintButtonImg)}
            onClick={async () => {
              if (!walletAddress) {
                alert("Connect a wallet first!");
              } else {
                const proof = getProof("VIP", walletAddress);
                await mint("VIP", proof, count);
              }
            }}
          />
          <MintButton
            src={MintButtonImg}
            className={showWhitelistButton ? "" : "active"}
            onMouseEnter={(x) => (x.currentTarget.src = MintHoverImg)}
            onMouseLeave={(x) => (x.currentTarget.src = MintButtonImg)}
            onClick={async () => {
              if (!walletAddress) {
                alert("Connect a wallet first!");
              } else {
                const proof = getProof("Whitelist", walletAddress);

                console.log(proof)

                await mint("Whitelist", proof, count);
              }
            }}
          />
        </MintContainer>
      </Container>
    </>
  );
};

export default Main;
