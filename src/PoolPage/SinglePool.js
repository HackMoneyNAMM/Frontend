import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PoolData(props) {

    console.log(props.ticker);

    return (
        <div>

        </div>
    )
}

function SinglePool(props) {

    const location = useLocation();
    const data = location.state;

    useEffect(
        () => console.log(data)
    );

return (
    <div>
        <PoolData ticker={data.ticker}/>
    </div>
)

}

export default SinglePool;