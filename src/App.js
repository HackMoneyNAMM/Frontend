import {BrowserRouter as Router, useLocation} from 'react-router-dom'
import { Route, Routes, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PoolPage from './PoolPage/PoolPage';
import SwapPage from './SwapPage/SwapPage';
import HomePage from './HomePage/HomePage'
import Header from './header/Header'

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

export default function App(props) {

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
    
  const [activeChain, setActiveChain] = useState(supportedChainsInfo.polygon.mainnet)

  const location = useLocation()

  const propObj = {
    provider:provider, 
    signer:signer, 
    setProvider:setProvider, 
    setSigner:setSigner, 
    activeChain:activeChain, 
    setActiveChain:setActiveChain, 
    supportedChainsInfo:supportedChainsInfo,
    location: location,
  }

    return (
    
        <Switch>
            <Route path="/pool-page">
              <Header propObj={propObj}/>
              <PoolPage
                propObj={propObj}
                pageId={Date.now()}
              />  
            </Route>

            <Route path="/swap-page">
              <Header propObj={propObj}/>
              <SwapPage
                propObj={propObj}
                pageId={Date.now()}
              />
            </Route>

            <Route exact path="/">
            <Header propObj={propObj}/>
              <HomePage
                propObj={propObj}
                pageId={Date.now()}
              />
            
            </Route>
        </Switch>
    );
}