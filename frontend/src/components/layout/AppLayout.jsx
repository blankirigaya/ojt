import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { Search, Settings, Lock, Wallet } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AppLayout() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-ink-950 font-body text-steel-200">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Topbar matching the Staking dashboard */}
        <header className="h-20 border-b border-ink-700/50 flex items-center justify-between px-10 sticky top-0 bg-ink-950/80 backdrop-blur-md z-30">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-ink-900 border border-ink-600 rounded-full pl-1 pr-4 py-1">
              <div className="w-8 h-8 rounded-full bg-ink-700 border-2 border-brand-500 overflow-hidden">
                {/* avatar placeholder */}
                <div className="w-full h-full flex justify-center items-center font-display text-xs text-white">
                 {user?.full_name?.[0] || 'R'}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-steel-400 font-medium uppercase tracking-[0.2em]">{user?.role || 'PRO'}</span>
                <span className="text-sm font-medium text-white">{user?.full_name || 'Ryan Crawford'}</span>
              </div>
            </div>

            <button className="bg-brand-300 text-brand-900 font-medium font-body text-sm px-6 py-2 rounded-full flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Deposit <Lock size={14} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-ink-900 border border-ink-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-steel-500 focus:outline-none focus:border-steel-400 transition-colors w-64"
              />
            </div>
            <button className="w-10 h-10 rounded-full border border-ink-700 bg-ink-900 flex items-center justify-center text-steel-400 hover:text-white hover:border-steel-400 transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <div className="max-w-[1400px] w-full mx-auto px-10 py-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
