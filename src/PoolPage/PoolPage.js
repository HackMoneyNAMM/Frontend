import { useState } from "react";
import Header from "../header/Header";

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

function PoolPage() {

  const [pools, setPools] = useState([])

  async function makePool() {
    console.log("Making Pool");
    const newPool = {
      name: "TestPool",
      tokens: []
    };
    const poolArray = [...pools, newPool];
    setPools(poolArray);
    console.log(pools);
  }

  

  return (
    <div>
      <Header/>
      <h1 className="text-3xl">
        Pool Page
      </h1>
      <div>
        <button onClick={makePool}>Create Pool</button>
      </div>
      <PoolList toBeListed = {pools}/>
    </div>
  )
}

export default PoolPage;
