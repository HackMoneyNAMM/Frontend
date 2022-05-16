import {BrowserRouter as Router} from 'react-router-dom'
import { Route, Routes, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PoolPage from './PoolPage/PoolPage';
import SwapPage from './SwapPage/SwapPage';
import HomePage from './HomePage/HomePage'

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

export default function App() {

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
    
  const [activeChain, setActiveChain] = useState(supportedChainsInfo.polygon.mainnet)

  useEffect(() => {
    console.log("Hello from App.js")
  })

    return (
    <Router forceRefresh={true}>
        <Switch>
            <Route exact path={"/"}>
                <HomePage
                  provider={provider} 
                  signer={signer} 
                  setProvider={setProvider} 
                  setSigner={setSigner} 
                  activeChain={activeChain} 
                  setActiveChain={setActiveChain} 
                  supportedChainsInfo={supportedChainsInfo}
            />
            </Route>
            <Route exact path={"/PoolPage"} >
                <PoolPage
                  provider={provider} 
                  signer={signer} 
                  setProvider={setProvider} 
                  setSigner={setSigner} 
                  activeChain={activeChain} 
                  setActiveChain={setActiveChain} 
                  supportedChainsInfo={supportedChainsInfo}
                />
            </Route>
            <Route exact path={"/SwapPage"} >
                <SwapPage
                  provider={provider} 
                  signer={signer} 
                  setProvider={setProvider} 
                  setSigner={setSigner} 
                  activeChain={activeChain} 
                  setActiveChain={setActiveChain} 
                  supportedChainsInfo={supportedChainsInfo}
                />
            </Route>
        </Switch>
    </Router>
    );
}