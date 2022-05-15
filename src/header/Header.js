import { Link } from "react-router-dom"

function Header() {
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
        <div>Connect Wallet</div>
      </div>
    </nav>
  )
}

export default Header;
