import { useLocation } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import PoolPage from './PoolPage/PoolPage';
import SwapPage from './SwapPage/SwapPage';
import HomePage from './HomePage/HomePage'
import Header from './header/Header'
import { CreatePoolPage } from './PoolPage/CreatePoolPage';

const supportedChainsInfo = {
  polygon: {
    mainnet: {
      name: "Matic",
      rpc: "https://polygon-rpc.com/",
      chainId: "0x89",
      tokenName: "Matic",
      tokenDecimals: 18,
      tokenSymbol: "MM",
      blockExplorer: "https://polygonscan.com/",
      iconUrl: ""
    },
    testnet: {
      name: "Matic Mumbai",
      rpc: "https://rpc-mumbai.matic.today",
      chainId: "0x13881",
      tokenName: "Matic",
      tokenDecimals: 18,
      tokenSymbol: "MM",
      blockExplorer: "https://mumbai.polygonscan.com/",
      iconUrl: ""
    }
  },

  arbitrum: {
    mainnet: {
      name: "Arbitrum One",
      rpc: "https://arb1.arbitrum.io/rpc",
      chainId: "0xa4b1",
      tokenName: "Matic",
      tokenDecimals: 18,
      tokenSymbol: "MM",
      blockExplorer: "https://arbiscan.io/",
      iconUrl: ""
    },
    testnet: {
      name: "Arbitrum Testnet",
      rpc: "https://rinkeby.arbitrum.io/rpc",
      chainId: "0x66eeb",
      tokenName: "Matic",
      tokenDecimals: 18,
      tokenSymbol: "MM",
      blockExplorer: "https://testnet.arbiscan.io/",
      iconUrl: ""
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

            <Route path="/create-pool">
              <Header propObj={propObj}/>
              <CreatePoolPage
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