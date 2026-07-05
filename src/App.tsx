import { Toaster } from 'sonner'
import './App.css'
import Router from './Routes/Router'

function App() {

  return (
    <>
      <Router/>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
