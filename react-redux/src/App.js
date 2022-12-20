import {useSelector, useDispatch} from 'react-redux';
import './App.css';
import { actions } from './store';

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const increment = () => {
    // dispatch({type:'INC'});
    dispatch(actions.increment());
  }

  const decrement = () => {
    // dispatch({type:'DEC'});
    dispatch(actions.decrement());
  }
  const addBy = () => {
    // dispatch({type: 'ADD', payload: 10})
    dispatch(actions.addBy(20));
  }

  return(
    <div>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <button onClick={addBy}>+++</button>
    </div>
  )
}

export default App;
