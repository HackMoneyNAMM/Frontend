import { mumbaiAddress, factoryABI } from "../Settings/FactoryDeploy";
const { ethers } = require("ethers");

//TestTokenAddrs:
//T2USD: 0xd9D4bc496Af93606Ea1b083A4373545321A7F6A2
//TMATIC: 0x5573D015841b69f079A573aB8C722AdFb2285dBd
//TUSD: 0xA508E164eB7A9DdA63Ec92c251b3aDa4Fc498f7b

export function CreatePoolPage(props){

    async function makePool(e) {
        e.preventDefault()
        const name = e.target.name.value
        const ticker = e.target.ticker.value
        const a = ethers.utils.hexlify(e.target.a.value)
        const aName = e.target.aName.value
        const b = ethers.utils.hexlify(e.target.b.value)
        const bName = e.target.bName.value
        const y = ethers.utils.hexlify(e.target.y.value)
        const yName = e.target.yName.value
        const sigma = parseInt(e.target.sigma.value)
        const eta = parseInt(e.target.eta.value)

        console.log({
            name:name, 
            ticker: ticker,
            a: a,
            b: b,
            y: y,
            aName: aName,
            bName: bName,
            yName: yName,
            sigma: sigma,
            eta: eta
        })

        const contract = new ethers.Contract(mumbaiAddress, factoryABI, props.propObj.provider);
        const contractWithSigner = contract.connect(props.propObj.signer);
        const tx = await contractWithSigner.newPool(name, ticker, [a,b,y], [aName, bName, yName], sigma, eta);
        console.log(tx);
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
                    <input name="sigma"/>
                </label>
                
                <label>
                    Eta
                    <input name="eta"/>
                </label>

                <label>
                    Token A Name
                    <input name="aName"/>
                </label>
                
                <label>
                    Token Address A
                    <input name="a"/>
                </label>

                <label>
                    Token B Name
                    <input name="bName"/>
                </label>
                
                <label>
                    Token Address B
                    <input name="b"/>
                </label>

                <label>
                    Token Y Name
                    <input name="yName"/>
                </label>
                
                <label>
                    Token Address Y
                    <input name="y"/>
                </label>

                <button>Create Pool</button>
            </form>

            
        </div>
    )

}