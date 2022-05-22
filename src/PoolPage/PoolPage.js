import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");
const endpoint = "https://api.thegraph.com/subgraphs/name/ewitulsk/hackmoneymumbai";
const headers = {
  "content-type": "application/json"
};

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

async function getPools() {
  const graphqlQuery = {
    "operationName": "fetchPools",
    "query": `query fetchPools { pools { id poolId poolAddr LPAddr totalTokenNum tokenAddresses name ticker reserves sigma eta} }`,
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
  console.log(response.errors);
}

function PoolPage(props) {

  const [pools, setPools] = useState([])
  

  useEffect(()=>{
    getPools();  
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
