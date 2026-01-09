import React from 'react'
import Search from '../components/Home/Search'
import Leftcard from '../components/BusBooking/Leftcard'
import Sortcard from '../components/BusBooking/Sortcard'

const Busdetails = () => {
  return (
    // Background color slate-50 provides a soft contrast for white cards
    <div className="min-h-screen bg-white pb-10">
      
    
       <Search/>
      {/* 2. MAIN LAYOUT: Centered container for Filters and Results */}
      <div className="max-w-7xl mx-auto px-2 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* SIDEBAR: Hidden on mobile via the 'hidden lg:block' inside Leftcard */}
        <aside className="sticky top-6">
           <Leftcard />
        </aside>

        {/* MAIN CONTENT: Takes up the remaining space */}
        <main className="flex-1 w-full space-y-4">
          <Sortcard />

          {/* This is where your Bus List Cards will go next */}
          <div className="w-full bg-white rounded-2xl border border-dashed border-slate-300 h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
             <p className="font-bold">Bus Results Coming Soon</p>
             <p className="text-sm">We will map your bus data here.</p>
          </div>
        </main>

      </div>
    </div>
  )
}

export default Busdetails