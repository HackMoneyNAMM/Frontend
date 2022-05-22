import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { poolABI } from "../Settings/PoolDeploy";
import { ierc20ABI } from "../Settings/IERC20";
import { BigNumber, ethers } from "ethers"
import { Formatter } from "@ethersproject/providers";
const axios = require("axios");

function PoolData(props) {

    console.log(props.poolId);

    return (
        <div>

        </div>
    )
}

function SinglePool(props) {

    const [amounts , setAmounts] = useState({
        amountA:0,
        amountB:0,
        amountY:0
    })

    const [tokenBals, setTokenBals] = useState([0,0,0])
    const [lpBal, setLpBal] = useState(null);

    const location = useLocation();
    const data = location.state;

    useEffect(()=>{
        if(props.propObj.provider){
            getUserLPBal(data.pools[data.poolId])
            getUserTokenBals(data.pools[data.poolId])
        }
    }, [])


    async function getUserLPBal(pool){
        let address = props.propObj.provider.provider.selectedAddress.toString()
        console.log(address)
        const contract = new ethers.Contract(pool.LPAddr, ierc20ABI, props.propObj.provider);
        const contractWithSigner = contract.connect(props.propObj.signer);
        const bal = await contractWithSigner.balanceOf(address);
        console.log("LPBal:".concat(bal));
        setLpBal(bal.toString())
    }

    async function getUserTokenBals(pool){
        let address = props.propObj.provider.provider.selectedAddress.toString()
        console.log(address)
        let tokenBals = []

        for(let i=0; i<pool.tokenAddresses.length; i++){
            const contract = new ethers.Contract(pool.tokenAddresses[i], ierc20ABI, props.propObj.provider);
            const contractWithSigner = contract.connect(props.propObj.signer);
            const bal = await contractWithSigner.balanceOf(address);
            
            tokenBals.push(bal.toString())
        }

        setTokenBals(tokenBals)
        
    }

    async function handleDeposit(e){
        e.preventDefault()
        let amountA = bigify(amounts.amountA);
        let amountB = bigify(amounts.amountB);
        let amountY = bigify(amounts.amountY);
        console.log(amountA)
        let pool = data.pools[data.poolId]
        const contract = new ethers.Contract(pool.poolAddr, poolABI, props.propObj.provider);
        const contractWithSigner = contract.connect(props.propObj.signer);
        const tx = await contractWithSigner.mint([amountA, amountB, amountY]);
        console.log(tx);
    }

    function bigify(num){
        return BigNumber.from(num).mul( BigNumber.from(10).pow(BigNumber.from(18)) )
    }

    async function approve(e, amount, asset){
        e.preventDefault()
        console.log(data.pools[data.poolId].poolAddr)
        let assetAddr;
        
        if(asset == "A"){
            assetAddr = data.pools[data.poolId].tokenAddresses[0]
            setAmounts({
                amountA: amount,
                amountB: amounts.amountB,
                amountY: amounts.amountY
            })
        }
            
        if(asset == "B"){
            assetAddr = data.pools[data.poolId].tokenAddresses[1]
            setAmounts({
                amountA: amounts.amountA,
                amountB: amount,
                amountY: amounts.amountY
            })
        }
            
        if(asset == "Y"){
            assetAddr = data.pools[data.poolId].tokenAddresses[2]
            setAmounts({
                amountA: amounts.amountA,
                amountB: amounts.amountB,
                amountY: amount
            })
        }
        
        const bigAmount = bigify(amount)
        const contract = new ethers.Contract(assetAddr, ierc20ABI, props.propObj.provider);
        const contractWithSigner = contract.connect(props.propObj.signer);
        const bal = await contractWithSigner.increaseAllowance(data.pools[data.poolId].poolAddr, bigAmount);
        console.log(bal);
        
    }

    function PoolDeposit(){
        return(
           <div>
                <form onSubmit={(e)=>approve(e, e.target.amountA.value, "A")}>
                    <label>
                        Amount A: 
                        <input name="amountA" defaultValue={amounts.amountA}/>
                    </label>
                    
                    <button>Approve A</button>
                    <div>A Bal: {props.propObj.provider ? <div>{tokenBals[0]}</div> : null}</div>
                </form>
                
                <form onSubmit={(e)=>approve(e, e.target.amountB.value, "B")}>
                    <label>
                        Amount B:
                        <input name="amountB" defaultValue={amounts.amountB}/>
                    </label>
                    
                    <button>Approve B</button>
                    <div>B Bal: {props.propObj.provider ? <div>{tokenBals[1]}</div> : null}</div>
                </form>
                
                <form onSubmit={(e)=>approve(e, e.target.amountY.value, "Y")}>
                    <label>
                        Amount Y:
                        <input name="amountY" defaultValue={amounts.amountY}/>
                    </label>

                    <button>Approve Y</button>
                    <div>Y Bal: {props.propObj.provider ? <div>{tokenBals[2]}</div> : null}</div>
                </form>
                
                <button onClick={handleDeposit}>Deposit</button>
                <div>LP Bal: {props.propObj.provider ? <div>{lpBal}</div> : null}</div>
            </div>
        )
        
    }

    useEffect(
        () => console.log(data)
    );

return (
    <div>
        <PoolData poolId={data.poolId}/>
        {props.propObj.provider ? <PoolDeposit/> : null}
    </div>
)

}

export default SinglePool;