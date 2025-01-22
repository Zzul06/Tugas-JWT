import { useState } from 'react'
import List from './List.jsx'
import Form from './form.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <List></List>
      <Form></Form>
    </>
  )
}


export default App
