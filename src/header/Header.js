import { Link } from "react-router-dom"
import { ethers } from "ethers";
import Web3Modal from "web3modal";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


function Header(props) {

  async function connectWallet(){

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
        <div>Select Chain</div>
      </div>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </nav>
  )
}

export default Header;
