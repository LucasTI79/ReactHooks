import React from 'react'
import './App.css';
import Button from './components/Button';
import ThemeProvider, { useTheme } from './contexts/ThemeContext'

const fnPlusCounter = new Set()

const fnMinusCounter = new Set()

function App() {
  function reducer(state, action){
    switch(action.type){
      case 'plus':
        return {
          counter: state.counter + 1,
          clicks: state.clicks + 1
        }
      case 'minus':
        return {
          counter: state.counter - 1,
          clicks: state.clicks + 1
        }
      default:
        return state
    }
    
  }
  
  const initialValue = {
    counter: 0,
    clicks: 0
  }

  const [name, setName] =  React.useState('')
  const [renderMemo, setRenderMemo] = React.useState(0)
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  React.useEffect(()=>{
    (async () => {
      await new Promise((resolve, reject) => {
        resolve(console.log('Hello'))
        reject('Bye')
      })
    })();
    return(
      'Bye Bye'
    )
  },[])

  function handleMinus(){
    dispatch({ type: 'minus'})
  }
  fnMinusCounter.add(handleMinus)
  console.log(fnMinusCounter.size)

  //useCallback return function
  const handlePlus = React.useCallback(() => {
    dispatch({ type: 'plus' })
  },[])
  fnPlusCounter.add(handlePlus)
  console.log(fnPlusCounter.size)

  //useMemo execute function
  const total = React.useMemo(() => {
    console.log('useMemo rodou')
    return (renderMemo * 10)
  },[renderMemo])

  function handleEqual(){
    setRenderMemo(prev => prev+1)
  }

  return (
    <ThemeProvider>
      <div className="App">
        <h1>{state.counter}</h1>
        <h4>Cliques: {state.clicks}</h4>
        <h5>Cliques equal: {renderMemo}</h5>
        <h6>Total: {total}</h6>
        <button disabled={!state.counter && true} onClick={handleMinus}>-</button>
        <button onClick={handleEqual}>=</button>
        <Plus onClick={handlePlus}>+</Plus>

        <br/>
        <span>{name}</span>
        <br/>
        <input onChange={e => setName(e.target.value)} />
        <br/>
        <Button onClick={() => {}}>Mudar tema</Button>
      </div>
    </ThemeProvider>
  );
}

function Plus(props){
  return(
    <button onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default App;
