import { Outlet } from 'react-router-dom'
import './App.scss'
import { WalletContextProvider } from './components/WalletContextProvider'

const App = () => {
  return (
    <WalletContextProvider>
      <Outlet />
    </WalletContextProvider>
  )
}

export default App
