import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/action";
import { useState } from "react";

const Toolbar = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();
    const [handleShow, setHandleShow] = useState(false);
    const handleChange = () => {
        setHandleShow(!handleShow);
    }
  
    return (
        <>
            <div className={`bg-white z-50 min-h-full tablet:min-w-350 tablet:block large:min-w-450 min-w-300 ${handleShow ? 'block fixed' : 'hidden'}`}>
                <h1>Count: {count}</h1>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
            <button className={`z-10 tablet:hidden relative -mr-30 ${handleShow ? 'left-300' : 'left-0'}`} onClick={handleChange}>
                <img src={`/image/${handleShow ? 'left' : 'right'}-arrow.png`} alt="toggle" className="min-w-30 min-h-30" width={30} height={30}></img>
            </button>
        </>
    );
};

export default Toolbar;