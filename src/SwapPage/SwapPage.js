import Header from "../header/Header";
import { useEffect } from "react";

function SwapPage(props) {

  useEffect(()=>{
    
  }, [])

  return (
    <div key={props.pageId}>
      <h1 className="text-3xl">
        Swap Page
      </h1>
    </div>
  )
}

export default SwapPage;
