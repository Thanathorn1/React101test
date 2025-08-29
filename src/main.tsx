import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Subjectlist from './Subjectlist.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Subjectlist />
  </StrictMode>,
)
