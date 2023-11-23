import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DarkModeSwitcher } from './components/composite/DarkModeSwitcher';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const SECOND_IN_MS = 1000
const MINUTE_IN_MS = 60 * SECOND_IN_MS

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * MINUTE_IN_MS ,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="bg-backgroundLightGray dark:bg-gray-900 overflow-hidden">
        <div className="flex justify-end w-full px-20 pt-5"  style={{position: 'relative', zIndex: 10}}>
          <DarkModeSwitcher />
        </div>
        <App />
      </main>
    </QueryClientProvider>
  </React.StrictMode>,
)
