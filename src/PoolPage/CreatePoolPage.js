import { mumbaiAddress, factoryABI } from "../Settings/FactoryDeploy";
const { ethers } = require("ethers");

//TestTokenAddrs:
//

export function CreatePoolPage(props){

    async function makePool(e) {
        const name = e.target.name.value
        const ticker = e.target.name.value
        const a = e.target.name.value
        const b = e.target.name.value
        const y = e.target.name.value
        const sigma = e.target.name.value
        const eta = e.target.name.value

        const contract = new ethers.Contract(mumbaiAddress, factoryABI, props.propObj.provider);
        const contractWithSigner = contract.connect(props.propObj.signer);
        await contractWithSigner.newPool(name, ticker, [a,b,y], sigma, eta);
      }
    

    return(
        <div key={props.pageId}>
            <form onSubmit={makePool}>
                <label>
                    Pool Name
                    <input name="name"/>
                </label>
                
                <label>
                    Pool Ticker
                    <input name="ticker"/>
                </label>
               
                <label>
                    Sigma
                    <input sigma="sigma"/>
                </label>
                
                <label>
                    Eta
                    <input eta="eta"/>
                </label>
                
                <label>
                    Token Address A
                    <input a="a"/>
                </label>
                
                <label>
                    Token Address B
                    <input b="b"/>
                </label>
                
                <label>
                    Token Address Y
                    <input c="c"/>
                </label>
                
                <button>Create Pool</button>
            </form>

            
        </div>
    )

}