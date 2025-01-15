import LandingPage from './pages/LandingPage'
import EmailTemplateSender from './pages/tools/EmailTemplateSender'
import PDFConverter from './pages/tools/PDFConverter'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/email-template-sender" element={<EmailTemplateSender />} />
        <Route path="/html-to-pdf-converter" element={<PDFConverter />} />
      </Routes>
    </Router>
  )
}

export default App
