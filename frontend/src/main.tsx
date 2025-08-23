import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
    <div className='flex h-[100vh] w-[100vw] justify-center items-center'>
      <img src='../istockphoto-1348157796-612x612.jpg'/>

    </div>
    </BrowserRouter>
  </ThemeProvider>
  ,
)
