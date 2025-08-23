import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <img src='../istockphoto-1348157796-612x612.jpg'/>
    </BrowserRouter>
  </ThemeProvider>
  ,
)
