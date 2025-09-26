import { useState } from 'react'
import Cookis from "js-cookie";
import Dashboard from './components/Dashboard'
import Login from './components/Login'
export default function App() {

  const [loggedIn, setLoggedIn] = useState(!!Cookis.get("token"));

  return loggedIn? <Dashboard/> : <Login onLogin={()=>setLoggedIn(true)}/>
  
}

