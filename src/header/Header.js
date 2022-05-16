import { Link } from "react-router-dom"
import { ethers } from "ethers";
import Web3Modal from "web3modal";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

function Header(props) {

  async function connectWallet(){
    console.log(props)
    const providerOpts = {
    
      /*
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            [props.activeChain.chainId]: props.activeChain.rpc
          }
        }
      },*/
  
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "HackMoney NAMM",
          rpc: {
            [props.activeChain.chainId]: props.activeChain.rpc
          }
        }
      }
  
    }
  
    //const providerOpts = {}
  
    const web3Modal = new Web3Modal({
      network: "testnet",
      cacheProvider: true,
      providerOpts
  });

    const instance = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(instance)
    props.setProvider(provider)
    props.setSigner(provider.getSigner())
  }

  function setActiveChain(value, props) {
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
    }
    console.log("Setting chain to: "+activeChain.name)
    props.setActiveChain(activeChain)
  }

  return (
    <nav className="grid grid-cols-5 gap 4">
      <div>
        <Link to="/">LOGO</Link>
      </div>
      <div>
        <Link to="/swapPage">Swap</Link>
      </div>
      <div>
        <Link to="/poolPage">Pool</Link>
      </div>
      <div>
        <label>Chain: </label>
        <select name="chains" id="chains" onChange={(e) => setActiveChain(e.target.value, props)}>
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
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </nav>
  )
}

export default Header;
