import { useEffect } from "react";


function HomePage(props) {

  useEffect(()=>{
    
  }, [])

  return (
    <div key={props.pageId}>
      
      <h1 className="text-3xl font-bold underline">
        Welcome to The ERPPS Protocol
      </h1>
      <div>
      </div>
    </div>
  )
} 

export default HomePage;
