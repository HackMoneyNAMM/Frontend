import { useEffect, useState} from "react";
import React from "react";
import { ReactDOM } from "react-dom";
import { poolABI } from "../Settings/PoolDeploy";
import { ierc20ABI } from "../Settings/IERC20";
import { ethers, BigNumber } from "ethers";

const axios = require("axios");

function SwapPage(props) {

  const [pools, setPools] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tradePool, setTradePool] = useState(null);
  const [token1Addr, setToken1Addr] = useState(null);
  const [token2Addr, setToken2Addr] = useState(null);
  const [releaseAmount, setReleaseAmount] = useState(null);

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
    let tokenAddress = e.target.value;
    console.log("Setting Token Addr 2")
    setToken2Addr(tokenAddress)
  }

  function findIndex(addr, arr){
    for(let i=0; i<arr.length; i++){
      if(arr[i] == addr){
        return i;
      }
    }
  }

  function bigify(num){
    return BigNumber.from(num).mul( ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)) )
  }

  async function handleSwap(e){
    e.preventDefault()

    let amountIn = e.target.amountIn.value
    //let bigIn = bigify(amountIn)
    //console.log(bigIn)

    let indexOfTokenGiven = findIndex(token1Addr, tradePool.tokenAddresses)
    let indexOfTargetToken = findIndex(token2Addr, tradePool.tokenAddresses)

    console.log(indexOfTokenGiven)
    console.log(indexOfTargetToken)

    const contract = new ethers.Contract(tradePool.poolAddr, poolABI, props.propObj.provider);
    const contractWithSigner = contract.connect(props.propObj.signer);
    const tx = await contractWithSigner.swap(indexOfTokenGiven, amountIn, indexOfTargetToken);

  }

  // async function calcRelease(){
  //   let indexOfTokenGiven = findIndex(token1Addr, tradePool.tokenAddresses)
  //   let indexOfTargetToken = findIndex(token2Addr, tradePool.tokenAddresses)

  //   console.log(indexOfTokenGiven)
  //   console.log(indexOfTargetToken)


  //   const contract = new ethers.Contract(tradePool.poolAddr, ierc20ABI, props.propObj.provider);
  //   const contractWithSigner = contract.connect(props.propObj.signer);
  //   const amount = await contractWithSigner.calcTokensToRelease(indexOfTokenGiven, bigify(amount), indexOfTargetToken);
  //   console.log(amount);
  //   setReleaseAmount(amount.toString())
  // }

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
        Out Token:
        <select name="outToken" onChange={handleToken2Change}>
                {tradePoolMap}
        </select>
      </label>
      

      <form onSubmit={handleSwap}>
        <label>
          Amount
          <input name="amountIn"/>
        </label>
        <button>Swap</button>
        {
          //<button onClick={calcRelease}>Calc</button>
        }
      </form>
      
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
