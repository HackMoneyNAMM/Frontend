import Header from "../header/Header";
import { useEffect } from "react";

import { useState } from "react";

function HomePage(props) {

  useEffect(()=>{
    
  }, [])

  return (
    <div key={props.pageId}>
      
      <h1 className="text-3xl font-bold underline">
        Welcome to our Nested AMM
      </h1>
      <div>
        {props.propObj.provider ? props.propObj.provider.provider.selectedAddress : ""}
      </div>
    </div>
  )
} 

export default HomePage;
