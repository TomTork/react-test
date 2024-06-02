import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TextPage from './components/TextPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/text" element={<TextPage />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
)
