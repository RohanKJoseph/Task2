import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SitesOverview from './pages/page1'
import SiteDetailsPage from './pages/page2'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <>
       <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Navigate to="/all-sites" replace />} />
            <Route path="/all-sites" element={<SitesOverview />} />
            <Route path="/sites/:siteId" element={<SiteDetailsPage />} />
          </Routes>
    </QueryClientProvider>
    </>
  )
}

export default App
