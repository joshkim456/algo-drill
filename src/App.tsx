import { HashRouter, Routes, Route } from 'react-router-dom'
import { StorageProvider } from './hooks/useStorage'
import HomeScreen from './components/Home/HomeScreen'
import RoundScreen from './components/Round/RoundScreen'
import RoundSummary from './components/Summary/RoundSummary'

export default function App() {
  return (
    <StorageProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#0f1117]">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/round/:section/:topic" element={<RoundScreen />} />
            <Route path="/summary" element={<RoundSummary />} />
          </Routes>
        </div>
      </HashRouter>
    </StorageProvider>
  )
}
