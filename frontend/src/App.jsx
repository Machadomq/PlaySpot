import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import usericon from './assets/usericon.png'

function App() {
  return (
    <>
      <header>
        <p className='titulo'>PlaySpot</p>
        <img className='usericon' src={usericon} alt="" />
      </header>

      <div className="container">
        <img src={logo} alt="Logo PlaySpot" />
      </div>
      
    </>
  )
}

export default App

