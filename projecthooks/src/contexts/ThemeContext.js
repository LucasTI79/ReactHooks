import React from 'react'

const ThemeContext = React.createContext()

export default function ThemeProvider(props){
  const [theme, setTheme] = React.useState('dark')
  function handleToggleTheme(){
    setTheme(prevState => (
      prevState === 'dark'
      ? 'light'
      : 'dark'
    ))
  }
  return(
    <ThemeContext.Provider value={{ 
      theme, 
      onToggleTheme: handleToggleTheme
       }}
       >
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
  const ctx = React.useContext(ThemeContext)
  return ctx
}



