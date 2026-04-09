/**
 * Dashboard — KPI cards, sales trend chart, top products, recent alerts.
 */
import { useState, useEffect } from 'react'
import { Package, AlertTriangle, DollarSign, Activity, TrendingUp, TrendingDown, Clock, ShieldCheck, Zap } from 'lucide-react'
import {
  AreaChart, Area, ResponsiveContainer
} from 'recharts'
import { productsApi } from '../api/services'
import { Spinner } from '../components/ui'
import toast from 'react-hot-toast'

// Mock chart data for sparklines
const mockTrendUp = [
  { val: 10 }, { val: 12 }, { val: 11 }, { val: 15 }, { val: 14 }, { val: 18 }, { val: 24 }
]
const mockTrendDown = [
  { val: 20 }, { val: 18 }, { val: 19 }, { val: 15 }, { val: 14 }, { val: 10 }, { val: 5 }
]

function GlowingSparkline({ data, color, glowColor }) {
  return (
    <div className="h-16 mt-2 relative">
      <div className="absolute inset-0 opacity-40 blur-lg" style={{ background: `linear-gradient(to top, transparent, ${glowColor})` }}></div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`glow-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="val"
            stroke={color}
            strokeWidth={2}
            fill={`url(#glow-${color.replace('#','')})`}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 4, fill: '#fff', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function StakingKpiCard({ title, value, subValue, subLabel, isUp, icon: Icon, color, trendData, glowColor }) {
  return (
    <div className="card-sm bg-ink-900/50 p-5 relative overflow-hidden group hover:border-ink-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-ink-800" style={{ color }}>
            <Icon size={14} />
          </div>
          <span className="font-body text-xs text-steel-200 font-medium">{title}</span>
        </div>
        <button className="text-steel-500 hover:text-white transition-colors">
          <TrendingUp size={14} />
        </button>
      </div>
      
      <div className="mt-4">
        <div className="font-body text-steel-400 text-[10px] uppercase tracking-widest mb-1">{subLabel}</div>
        <div className="font-display font-medium text-2xl text-white tracking-wide">{value}</div>
        <div className={`font-body text-xs mt-1 flex items-center gap-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
          {subValue}
        </div>
      </div>

      <GlowingSparkline data={trendData} color={color} glowColor={glowColor} />
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.dashboardStats()
      .then(s => setStats(s))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={32} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-steel-400">Recommended actions for 24 hours <Clock size={12} className="inline ml-1" /></span>
          <div className="bg-ink-800 border border-ink-700 px-3 py-1 rounded text-xs text-steel-200">3 Alerts</div>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <h1 className="font-display font-medium text-3xl text-white tracking-wide mb-6">Top Inventory Metrics</h1>
        <div className="flex items-center gap-2">
          <button className="bg-ink-800 border border-ink-600 text-steel-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1">24H <TrendingDown size={12}/></button>
          <button className="bg-ink-800 border border-ink-600 text-steel-200 text-xs px-3 py-1.5 rounded-full">By Value</button>
          <button className="bg-ink-800 border border-ink-600 text-steel-200 text-xs px-3 py-1.5 rounded-full">Desc</button>
        </div>
      </div>

      {/* Grid mapping Top Staking Cards + Promo Card */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* The 3 KPI Metric Cards */}
        <div className="col-span-8 grid grid-cols-3 gap-6">
          <StakingKpiCard 
            title="Total Valuation" 
            value={`₹${(stats?.total_inventory_value || 145000).toLocaleString()}`} 
            subValue="6.25%" 
            subLabel="Growth Rate" 
            isUp={true} 
            icon={DollarSign} 
            color="#A78BFA" // Purple
            glowColor="rgba(167, 139, 250, 0.15)"
            trendData={mockTrendUp}
          />
          <StakingKpiCard 
            title="Active Products" 
            value={(stats?.total_products || 342).toLocaleString()} 
            subValue="2.11%" 
            subLabel="Restock Rate" 
            isUp={true} 
            icon={Package} 
            color="#FBBF24" // Yellow/Amber
            glowColor="rgba(251, 191, 36, 0.15)"
            trendData={mockTrendUp}
          />
          <StakingKpiCard 
            title="Critical Stock" 
            value={(stats?.out_of_stock_count || 12).toLocaleString()} 
            subValue="1.89%" 
            subLabel="Depletion Rate" 
            isUp={false} 
            icon={AlertTriangle} 
            color="#EC4899" // Pink
            glowColor="rgba(236, 72, 153, 0.15)"
            trendData={mockTrendDown}
          />
        </div>

        {/* Promo Card (Liquid Staking Portfolio) */}
        <div className="col-span-4 card relative overflow-hidden bg-gradient-to-br from-[#1b153b] to-[#0A071E] border-brand-500/30 p-8 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-[80px] opacity-20 transform translate-x-10 -translate-y-10"></div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-white"/>
                <span className="font-display font-medium text-white text-sm">Inventory Shield</span>
              </div>
              <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
            </div>
            <h2 className="font-display font-medium text-2xl text-white mb-2 leading-tight">Smart Forecast<br/>Portfolio</h2>
            <p className="text-steel-400 text-xs font-body leading-relaxed max-w-[200px]">
              An all-in-one predictive model that helps you make smarter restock investments using ML algorithms.
            </p>
          </div>

          <div className="space-y-3 mt-8 z-10">
            <button className="w-full bg-white text-ink-950 font-medium font-body text-sm py-3 rounded-xl hover:bg-steel-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Enable Auto-Restock
            </button>
            <button className="w-full bg-ink-900 border border-brand-500/30 text-brand-300 font-medium font-body text-sm py-3 rounded-xl hover:bg-ink-800 transition-colors">
              Manage API Keys <Lock size={12} className="inline mb-0.5 ml-1"/>
            </button>
          </div>
        </div>
      </div>

      {/* Active Stakings Section Match -> Hero Stat Block */}
      <div className="mt-8">
        <h3 className="font-body text-steel-400 text-sm mb-4 tracking-wide">Your inventory health</h3>
        
        <div className="card p-8 bg-ink-900/40 relative">
          
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-steel-500 tracking-wider">LAST UPDATE — 46 MINUTES AGO</span>
                <Clock size={12} className="text-steel-500" />
              </div>
              <div className="flex items-center gap-3">
                <h2 className="font-display font-medium text-2xl text-white tracking-wide">Heavy Inventory (HVY)</h2>
                <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">▲</div>
                <div className="flex gap-1 ml-2">
                  <button className="w-7 h-7 rounded border border-ink-600 flex items-center justify-center text-steel-400 hover:text-white"><Activity size={12}/></button>
                  <button className="w-7 h-7 rounded border border-ink-600 flex items-center justify-center text-steel-400 hover:text-white"><Zap size={12}/></button>
                  <button className="h-7 px-3 rounded border border-ink-600 flex items-center justify-center text-steel-400 hover:text-white text-xs font-display">View Profile ↗</button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-steel-400 mb-2">Restock Horizon</div>
              <div className="flex items-center gap-2 bg-ink-950 p-1 rounded-full border border-ink-700">
                <span className="bg-ink-800 text-steel-200 text-[10px] px-3 py-1 rounded-full">1 Month</span>
                <span className="bg-brand-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)] text-[10px] px-3 py-1 rounded-full">3 Month</span>
                <span className="bg-ink-800 text-steel-200 text-[10px] px-3 py-1 rounded-full">6 Month</span>
              </div>
            </div>
          </div>

          <div className="flex items-end gap-6 mb-8 border-b border-ink-700/50 pb-10">
            <div>
              <div className="text-[10px] text-steel-400 tracking-widest mb-2 uppercase">Current Stock Valuation, HVY</div>
              <div className="font-display text-[4rem] leading-none text-white tracking-tight">
                31.39<span className="text-steel-500 text-[3rem]">686</span>
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <button className="bg-brand-500/20 border border-brand-500/50 text-brand-300 px-6 py-2 rounded-xl text-sm font-medium hover:bg-brand-500/30 transition-colors">
                Optimize
              </button>
              <button className="bg-transparent border border-ink-600 text-steel-300 px-6 py-2 rounded-xl text-sm font-medium hover:border-steel-400 transition-colors">
                Offload
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 px-2">
             <div className="border-r border-ink-700/50">
               <div className="text-xs text-steel-400 mb-1">Momentum</div>
               <div className="text-[10px] text-steel-500">Growth dynamics <TrendingUp size={10} className="inline ml-1"/></div>
             </div>
             <div className="border-r border-ink-700/50 pl-4">
               <div className="text-xs text-steel-400 mb-1">General</div>
               <div className="text-[10px] text-steel-500">Overview <Activity size={10} className="inline ml-1"/></div>
             </div>
             <div className="border-r border-ink-700/50 pl-4">
               <div className="text-xs text-steel-400 mb-1">Risk Assessment</div>
               <div className="text-[10px] text-steel-500">Volatility index <AlertTriangle size={10} className="inline ml-1"/></div>
             </div>
             <div className="pl-4">
               <div className="text-xs text-steel-400 mb-1">Reward Rate</div>
               <div className="text-[10px] text-steel-500">Expected profit <DollarSign size={10} className="inline ml-1"/></div>
               <div className="mt-2 w-full bg-ink-800 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-brand-500 w-2/3 h-full"></div>
               </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  )
}
