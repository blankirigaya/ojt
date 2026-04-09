/**
 * Sidebar — persistent left navigation with active state and user info.
 */
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, TrendingUp,
  AlertTriangle, Tags, Truck, LogOut, Activity, Search
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const NAV_ITEMS = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products',  icon: Package,         label: 'Assets'    },
  { to: '/sales',     icon: ShoppingCart,    label: 'Staking Providers', badge: '12' },
  { to: '/forecast',  icon: TrendingUp,      label: 'Staking Calculator' },
  { to: '/alerts',    icon: AlertTriangle,   label: 'Active Staking', badge: '6', badgeColor: 'bg-brand-500 text-white' },
  { to: '/categories',icon: Tags,            label: 'Data API'   },
  { to: '/suppliers', icon: Truck,           label: 'Liquid Staking', badge: 'Beta', badgeColor: 'bg-brand-600/20 text-brand-400' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Signed out')
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-ink-950 border-r border-ink-700 flex flex-col z-40">
      {/* Search & Logo Area (Mapping closely to the image's top left) */}
      <div className="px-6 py-6 pl-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 flex items-center justify-center border border-ink-600 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <Activity size={18} className="text-white relative z-10" strokeWidth={2} />
            <div className="absolute w-4 h-4 bg-brand-500 rounded-full blur-[8px] opacity-60"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="font-display font-medium text-lg text-white tracking-wide">Stakent</div>
            <div className="text-[10px] text-steel-400 mt-1 uppercase tracking-widest leading-none">®</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label, badge, badgeColor }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? 'bg-ink-800 text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
                  : 'text-steel-400 hover:text-white hover:bg-ink-900'
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'text-white' : 'text-steel-400 group-hover:text-steel-300'} />
                  <span className="font-body text-[13px] font-medium tracking-wide">{label}</span>
                </div>
                {badge && (
                  <div className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeColor || 'bg-ink-700 text-steel-400'}`}>
                    {badge}
                  </div>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Beta Pro Unlock (Bottom Action Area) */}
      <div className="p-4 mb-4">
        <div className="bg-ink-900 border border-ink-700 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-brand-500 transition-colors">
          <div className="text-brand-400"><Activity size={16}/></div>
          <div>
            <div className="text-sm text-white font-medium">Activate Super</div>
            <div className="text-[10px] text-steel-400">Unlock all features on Stakent</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
