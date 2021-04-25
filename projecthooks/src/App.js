import React from 'react'
import './App.css';
import Button from './components/Button';
import ThemeProvider from './contexts/ThemeContext'

const fnPlusCounter = new Set()

const fnMinusCounter = new Set()

function App() {
  console.log('rendered')
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

  const nameRef = React.useRef()
  const [renderMemo, setRenderMemo] = React.useState(0)
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  React.useLayoutEffect(()=>{
    console.log('Hello useLayoutEffect')
  },[])

  React.useEffect(()=>{
    console.log('Hello useEffect')
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

  function handlePrintName(){
    alert(nameRef.current.value)
    nameRef.current.focus()
  }

  const formRef = React.useRef(null)

  function handleSubmit(){
    formRef.current.submit()
  }

  const [loading, response] = useFetch('https://api.github.com/users/LucasTI79')
  
  if(loading){
    return <h1>loading...</h1>
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
        <br/>
        <input ref={nameRef} />
        <button onClick={handlePrintName}>Print Name</button>
        <br/>
        <Button onClick={() => {}}>Mudar tema</Button>
        <br/>
        <br/>
        <Form ref={formRef}/>
        <button onClick={handleSubmit}>Submit</button>
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

const Form = React.forwardRef((props, ref) => {
  const inputRef = React.useRef(null)

  function handleSubmit(){
    alert(inputRef.current.value)
  }

  React.useImperativeHandle(ref, () => {
    return {
      submit: handleSubmit
    }
  },[])
  return(
    <form>
      <input ref={inputRef} />
    </form>
  )
})

function useFetch(url){
  const [loading, setLoading] = React.useState(true)
  const [response, setResponse] = React.useState(null)
  React.useEffect(() => {
    (async ()=> {
      const resp = await fetch(url);
      const json = await resp.json();
      setLoading(false)
      setResponse({ json, status: resp.status })
    })();
  },[url])

  React.useDebugValue('label', (message) => {
    return `Status: ${message}`
  })

  return [loading, response?.json]
}

export default App;
