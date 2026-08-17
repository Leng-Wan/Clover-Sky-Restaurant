import './App.css'
import Header from './components/Header'
import FloorPlan from './components/FloorPlan'
import StatusProvider from './context/StatusContext'
export default function App()
{
  return(
    <div className='bg-slate-900 min-h-screen'>
      <StatusProvider>
        <Header/>
        <FloorPlan/>
      </StatusProvider>
    </div>
  )
}