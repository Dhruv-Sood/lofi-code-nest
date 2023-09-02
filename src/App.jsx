import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LoginPage from './components/LoginPage'
import Cookies from 'universal-cookie'
import ChatRoom from './components/ChatRoom'
import EnterRoom from './components/EnterRoom'

const cookies = new Cookies()
function App() {
  const [auth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  

  const roomRef = useRef(null)

  if(auth){
    return (
      <div>
        {!room ? (
          <EnterRoom roomRef={roomRef} setRoom={setRoom}/>
        ) : <ChatRoom room={room}/>}
      </div>
    )
  }
  return (
    <>
      <LoginPage setIsAuth={setIsAuth}/>
    </>
  )
}

export default App
