import { useEffect, useState} from "react";
import React from "react";
import { ReactDOM } from "react-dom";
const axios = require("axios");

function SwapPage(props) {

  const [pools, setPools] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tradePool, setTradePool] = useState(null);
  const [token1Addr, setToken1Addr] = useState(null);
  const [token2Addr, setToken2Addr] = useState(null);

  function tokenExists(tokenArr, tokenAddr, poolId){
    for(let i=0; i<tokenArr.length; i++){
      if(tokenArr[i].tokenAddress == tokenAddr && tokenArr[i].poolId == poolId){
        return true;
      }
    }
    return false;
  }

  function getAllTokens(pools){
    let allTokens = []
    console.log(pools)
    for(let i=0; i<pools.length; i++){
      
      for(let j=0; j<pools[i].tokenAddresses.length; j++){
        if(!tokenExists(allTokens, pools[i].tokenAddresses[j], pools[i].poolId)){
            allTokens.push({
              poolId: pools[i].poolId,
              tokenAddress: pools[i].tokenAddresses[j],
              tokenName: pools[i].tokenNames[j]
            })
          }
          
      }
    }
    return allTokens;
  }

  async function getPools() {
    const endpoint = "https://api.thegraph.com/subgraphs/name/ewitulsk/hackmoney-namm";
    const headers = {
      "content-type": "application/json"
    };

    const graphqlQuery = {
      "operationName": "fetchPools",
      "query": `query fetchPools { pools { id poolId poolAddr LPAddr totalTokenNum tokenAddresses tokenNames name ticker sigma eta} }`,
      "variables": {}
    };
  
    const response = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery
    });
    let pools = response.data.data.pools
    let allTokens = getAllTokens(pools);
    console.log(allTokens)
    setTokens(allTokens);
    setPools(pools);
    return pools
  }

  function handleToken1Change(e, token){
    e.preventDefault()
    let pool = pools[token.poolId];
    pool.tokenNameObjs = []
    for(let i=0; i<pool.tokenAddresses[i]; i++){
      pool.tokenNameObjs.push({
        poolId: pool.poolId,
        tokenAddress: pool.tokenAddresses[i],
        tokenName: pool.tokenNames[i]
      })
    }
    console.log(token)
    setTradePool(pool);
    setToken1Addr(token.tokenAddress)
    
  }

  function handleToken2Change(e){
    e.preventDefault()
    let token = e.target.value;
    setToken2Addr(token.tokenAddress)
    

  }

  function handleSwap(e){
    e.preventDefault()
    console.log("Swappin!")
  }

  const tokenMap = tokens.map((token) => <option onClick={(e)=>handleToken1Change(e, token)} key={String(token.poolId).concat(String(token.tokenAddress))}>{token.tokenName}</option>)
  const tradePoolMap = tradePool ? tradePool.tokenNameObjs.map((token) => <option key={String(token.tokenAddress).concat(String(token.tokenName))} value={token.tokenAddress}>{token.tokenName}</option>) : null

  useEffect(()=>{
    getPools();
  }, [])

  function SwapComponent(){
    return(
      <div>
      
          <label>
            In Token:
            <select name="inToken">
              {tokenMap}
            </select>
          </label>

          <label>
            Amount
            <input/>
          </label>

          <select name="outToken" onChange={handleToken2Change}>
              {tradePoolMap}
          </select>

          <label>
            Amount Output
            <input/>
          </label>
          
          <button type="submit">Swap</button>
      </div>
    )
  }

  return (
    <div key={props.pageId}>
      <h1 className="text-3xl">
        Swap Page
      </h1>
      <SwapComponent/>
    </div>
  )
}

export default SwapPage;
