import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import { address, abi } from "../Settings/MumbaiDeploy";

const { ethers } = require("ethers");

function PoolList(props) {

  const poolList = props.toBeListed.map((pool) => 
  <li key={pool.name}>
    {pool.name}
  </li>
  );

  return (
    <ul>{poolList}</ul>
  );
}

function PoolPage(props) {

  const [pools, setPools] = useState([])
  
  useEffect(()=>{
    
  }, [])

  async function makePool() {
    console.log("Making Pool");
    const newPool = {
      name: "TestPool",
      tokens: []
    };
    const poolArray = [...pools, newPool];
    setPools(poolArray);
    console.log(pools);

    const contract = new ethers.Contract(address, abi, props.propObj.provider);
    const contractWithSigner = contract.connect(props.propObj.signer);
    await contractWithSigner.newPool(["0x61bbc4a1a16b2e1c2f2e0295156e8e7ff07d9cc8"]);
  }

  return (
    <div key={props.pageId}>
      <h1 className="text-3xl">
        Pool Page
      </h1>
      <div>
        <button onClick={makePool}>Create Pool</button>
      </div>
      <PoolList toBeListed = {pools}/>
      <div>
        {props.propObj.provider ? props.propObj.provider.provider.selectedAddress : ""}
      </div>
    </div>
    
  )
}

export default PoolPage;
