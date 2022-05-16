import Header from "./header/Header";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState } from "react";

function App() {

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const [activeChain, setActiveChain] = useState(null)

  const supportedChainsInfo = {
    polygon: {
      mainnet: {
        name: "Matic",
        rpc: "https://polygon-rpc.com/",
        chainId: 137,
      },
      testnet: {
        name: "Matic Mumbai",
        rpc: "https://rpc-mumbai.matic.today",
        chainId: 80001,
      }
    },

    arbitrum: {
      mainnet: {
        name: "Arbitrum One",
        rpc: "https://arb1.arbitrum.io/rpc",
        chainId: 42161
      },
      testnet: {
        name: "Arbitrum Testnet",
        rpc: "https://rinkeby.arbitrum.io/rpc",
        chainId: 421611
      }
    },

    //We'll revisit Oasis Later
    //oasis: {
      //mainnet: {},
      //testnet: {}
    //}
  }

  return (
    <div>
      <Header provider={provider} signer={signer} setProvider={setProvider} setSigner={setSigner} activeChain={activeChain} setActiveChain={setActiveChain}/>
      <h1 className="text-3xl font-bold underline">
        Welcome to our Nested AMM
      </h1>
    </div>
  )
}

export default App;
