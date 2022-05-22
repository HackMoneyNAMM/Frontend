import { Link } from "react-router-dom"
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

function Header(props) {
  
  async function connectWallet(){
    const providerOpts = {
    
      //walletconnect: {
        //display: {
          //logo: "data:image/gif;base64,INSERT_BASE64_STRING",
          //name: "Mobile",
          //description: "Scan qrcode with your mobile wallet"
        //},
        //package: WalletConnectProvider,
        //options: {
          //infuraId: "3094aa966fb94b409be37128f029c2ec" // required
        //}
      //}
  
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "NAMM",
          infuraId: "3094aa966fb94b409be37128f029c2ec",
          rpc: props.propObj.activeChain.rpc,
          chainId: props.propObj.activeChain.chainId
        }
      }
  
    }
  
    //const providerOpts = {}
  
    const web3Modal = new Web3Modal({
      //network: "testnet",
      cacheProvider: true,
      //disableInjectedProvider: true,
      providerOpts
    });
    console.log(web3Modal)
    web3Modal.clearCachedProvider()
    const instance = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(instance)
    props.propObj.setProvider(provider)
    props.propObj.setSigner(provider.getSigner())
    console.log(providerOpts)
  }

  async function setActiveChain(value, props) {
    const chain = value
    let activeChain = "None";
    switch(chain){
      case "Matic":
        activeChain = props.supportedChainsInfo.polygon.mainnet
        break
      case "Matic Mumbai":
        activeChain = props.supportedChainsInfo.polygon.testnet
        break
      case "Arbitrum One":
        activeChain = props.supportedChainsInfo.arbitrum.mainnet
        break
      case "Arbitrum Testnet":
        activeChain = props.supportedChainsInfo.arbitrum.testnet
        break
      default:
        activeChain = props.activeChain
    }
    console.log("Setting chain to: "+activeChain.name)
    await switchNetwork(activeChain)
    props.setActiveChain(activeChain)
    
  }

  async function switchNetwork(activeChain){
    console.log("Trying Metamask Network Switch")
    console.log(props.propObj.provider)
    try {
      await props.propObj.provider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: activeChain.chainId }],
      });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await props.propObj.provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: activeChain.chainId,
                rpcUrls: [activeChain.rpc],
                chainName: activeChain.name,
                nativeCurrency: { name: activeChain.tokenName, decimals: activeChain.tokenDecimals, symbol: activeChain.tokenSymbol },
                blockExplorerUrls: [activeChain.blockExplorer],
                iconUrls: [activeChain.iconUrl]
              }
            ],
          });
        } catch (error) {
           console.error(error)
        }
      }
    }
  };

  return (
    <nav className="grid grid-cols-5 gap 4">
      <div>
        <Link to={"/"}>LOGO</Link>
      </div>
      <div>
        <Link to={"/swap-page"}>Swap</Link>
      </div>
      <div>
        <Link to={"/pool-page"}>Pool</Link>
      </div>
      <div>
        <label>Chain: </label>
        <select name="chains" id="chains" onChange={(e) => setActiveChain(e.target.value, props.propObj)}>
          <optgroup label="Mainnets">
            <option value="Matic">Polygon</option>
            <option value="Arbitrum One">Arbitrum</option>
          </optgroup>
          <optgroup label="Testnets">
            <option value="Matic Mumbai">Mumbai</option>
            <option value="Arbitrum Testnet">Arbitrum Testnet</option>
          </optgroup>
        </select>
      </div>
      <div>
        {!props.propObj.provider ? <button onClick={connectWallet}>Connect Wallet</button> : <div>{props.propObj.provider ? props.propObj.provider.provider.selectedAddress : ""}</div>}
      </div>
      <div>
        
      </div>
    </nav>
  )
}

export default Header;
