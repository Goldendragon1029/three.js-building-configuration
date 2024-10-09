import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/action";

const Toolbar = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();
  
    return (
      <div className="tablet:min-w-350 tablet:block large:min-w-450">
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    );
};

export default Toolbar;