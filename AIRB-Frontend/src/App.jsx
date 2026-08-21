import React from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-grow">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App;