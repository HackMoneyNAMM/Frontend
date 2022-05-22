import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
