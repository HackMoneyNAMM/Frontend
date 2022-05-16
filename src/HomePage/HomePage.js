import Header from "../header/Header";
import { useEffect } from "react";

import { useState } from "react";

function HomePage(props) {

  useEffect(()=>{
    console.log(props)
  })

  return (
    <div>
      <Header provider={props.provider} 
              signer={props.signer} 
              setProvider={props.setProvider} 
              setSigner={props.setSigner} 
              activeChain={props.activeChain} 
              setActiveChain={props.setActiveChain} 
              supportedChainsInfo={props.supportedChainsInfo}
      />
      <h1 className="text-3xl font-bold underline">
        Welcome to our Nested AMM
      </h1>
      <div>
        {props.provider ? props.provider.provider.selectedAddress : ""}
      </div>
    </div>
  )
} 

export default HomePage;
