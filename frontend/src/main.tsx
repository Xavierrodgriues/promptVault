import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  ,
)
