import { Routes, Route } from 'react-router-dom'
import ZensiPage from './ZensiPage'
import ClaudeModalPage from './pages/ClaudeModalPage'
import SubscriptionPage from './pages/SubscriptionPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ZensiPage />} />
      <Route path="/claude-modal" element={<ClaudeModalPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
    </Routes>
  )
}

export default App
