  import { useState } from 'react'
import './App.css'
import SitesOverview from './pages/page1'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
       <QueryClientProvider client={queryClient}>
          <SitesOverview/>
    </QueryClientProvider>
    </>
  )
}

export default App
