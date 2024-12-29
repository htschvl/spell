import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './pages/Main'

const App = () => {
  return (
    <>
    {/* TODO: implement routing */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main /> }></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
