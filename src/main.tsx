// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GanttChart from './GanttChart.tsx'
import './styles/App.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <GanttChart />
  // </StrictMode>,
)
