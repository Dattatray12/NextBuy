import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="flex gap-8 mb-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo w-20 h-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react w-20 h-20" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Vite + React + Tailwind</h1>
      <div className="card bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <button 
          className="px-6 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="text-gray-600">
          Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-6 text-sm text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
