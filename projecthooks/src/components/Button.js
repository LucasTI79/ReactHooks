import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function Button(props){
  const { theme } = useTheme()
  return(
    <button 
      onClick={props.onClick}
      style={{
        color: theme === 'dark' ? '#fff' : '#000',
        background: theme === 'dark' ? '#000' : '#fff'
      }}
      >
      {props.children}
    </button>
  )
}