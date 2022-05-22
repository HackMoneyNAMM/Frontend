import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");
const endpoint = "https://api.thegraph.com/subgraphs/name/ewitulsk/hackmoney-namm";
const headers = {
  "content-type": "application/json"
};

function PoolList(props) {

  console.log(props);
  const poolList = props.toBeListed.map((pool) => 
  <li key={pool.name}>
    <Link to={{pathname:`${pool.poolId}`, state: {pools: props.toBeListed, poolId: pool.poolId}}}>
    Name: {pool.name}, Ticker: {pool.poolId}
    </Link>
  </li>
  );

  return (
    <ul>{poolList}</ul>
  );
}

async function getPools(setPools) {
  const graphqlQuery = {
    "operationName": "fetchPools",
    "query": `query fetchPools { pools { id poolId poolAddr LPAddr totalTokenNum tokenAddresses name ticker sigma eta} }`,
    "variables": {}
  };

  const response = await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: graphqlQuery
  });

  console.log(response);
  console.log(response.data);
  console.log(response.data.data.pools);
  console.log(response.errors);

  setPools(response.data.data.pools);
}

function PoolPage(props) {

  const [pools, setPools] = useState([])
  

  useEffect(()=>{
    getPools(setPools);  
  }, [])

  return (
    <div key={props.pageId}>
      <div class="grid grid-cols-2">
        <h1 className="text-3xl">
          Pool Page
        </h1>
        <Link to ={"/create-pool"}>Create Pool</Link>
      </div>
      
      
      <PoolList toBeListed = {pools}/>
      
    </div>
    
  )
}

export default PoolPage;
