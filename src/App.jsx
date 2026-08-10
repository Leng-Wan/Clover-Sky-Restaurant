import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import FloorPlan from './components/FloorPlan'
export default function App()
{
  return(
    <div className='bg-slate-900 min-h-screen'>
      <Header/>
      <FloorPlan />
    </div>
  )
}