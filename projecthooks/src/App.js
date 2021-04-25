import React from 'react'
import './App.css';
import Button from './components/Button';
import ThemeProvider, { useTheme } from './contexts/ThemeContext'

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

const fnPlusCounter = new Set()

const fnMinusCounter = new Set()

function App() {
  const [name, setName] =  React.useState('')

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

  const handlePlus = React.useCallback(() => {
    dispatch({ type: 'plus' })
  },[])

  fnPlusCounter.add(handlePlus)
  console.log(fnPlusCounter.size)

  function handleMinus(){
    dispatch({ type: 'minus'})
  }
  fnMinusCounter.add(handleMinus)
  console.log(fnMinusCounter.size)
  
  return (
    <ThemeProvider>
      <div className="App">
        <h1>{state.counter}</h1>
        <h4>Cliques: {state.clicks}</h4>
        <button disabled={!state.counter && true} onClick={handleMinus}>-</button>
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
