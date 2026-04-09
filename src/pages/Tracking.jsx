import { useState, useEffect } from 'react'
import { COMPANY_NAME_SHORT, CTA_PRIMARY } from '../config/brand'
import { useAuth } from '../context/AuthContext'

const MOCK_ORDER_DATA = {
  id: 'ORD-8Y29X-11M',
  date: 'Oct 04, 2026',
  expectedDelivery: 'Oct 08, 2026',
  items: [
    { name: 'Comprehensive Family Emergency Kit', quantity: 1, price: 199.0 },
    { name: 'Daily Wellness Supplement', quantity: 2, price: 29.0 },
  ],
  statusIndex: 2, // 0: Placed, 1: Processing, 2: Shipped, 3: Delivered
}

const STATUSES = ['Order Placed', 'Processing', 'Shipped', 'Delivered']

export default function Tracking() {
  const { user, isAuthenticated } = useAuth()
  const [orderId, setOrderId] = useState('')
  const [trackedOrder, setTrackedOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [myOrders, setMyOrders] = useState([])

  const getStatusIndex = (status) => {
    if (status === 'Pending') return 0
    if (status === 'Processing') return 1
    if (status === 'Shipped') return 2
    if (status === 'Delivered') return 3
    return 0
  }

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const saved = localStorage.getItem('admin_orders')
      if (saved) {
        const allOrders = JSON.parse(saved)
        setMyOrders(allOrders.filter(o => o.customer?.email === user.email))
      }
    }
  }, [isAuthenticated, user])

  const performSearch = (searchId) => {
    if (!searchId.trim()) return
    setLoading(true)
    setError('')
    
    setTimeout(() => {
      setLoading(false)
      const savedData = localStorage.getItem('admin_orders')
      let foundLocal = null
      if (savedData) {
        const allOrders = JSON.parse(savedData)
        foundLocal = allOrders.find(o => o.id === searchId.trim().toUpperCase())
      }

      if (foundLocal) {
        setTrackedOrder({
          id: foundLocal.id,
          date: new Date(foundLocal.date).toLocaleDateString(),
          expectedDelivery: 'Expected in 3-5 days',
          items: foundLocal.items.map(i => ({ name: i.name, quantity: i.qty, price: i.price })),
          statusIndex: getStatusIndex(foundLocal.status)
        })
      } else if (searchId.trim().toUpperCase() === MOCK_ORDER_DATA.id || searchId.trim() === 'demo') {
        setTrackedOrder(MOCK_ORDER_DATA)
      } else {
        setError('Order not found. Please double-check your Order ID.')
        setTrackedOrder(null)
      }
    }, 800)
  }

  const handleTrack = (e) => {
    e.preventDefault()
    performSearch(orderId)
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-96 bg-brand-900 z-0"></div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-semibold tracking-tight text-white sm:text-4xl">Track Your Order</h1>
          <p className="mt-4 text-brand-100 max-w-xl mx-auto">
            Stay updated on your {COMPANY_NAME_SHORT} order's journey from our warehouse to your front door.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-200/50 rounded-2xl p-6 sm:p-10">
          <form onSubmit={handleTrack} className="flex gap-3">
            <label htmlFor="order-id" className="sr-only">Order ID</label>
            <input
              id="order-id"
              type="text"
              placeholder="Enter your Order ID (e.g. ORD-8Y29X-11M)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 px-5 py-4 text-slate-900 outline-none transition-all duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 hover:border-slate-300 bg-slate-50"
            />
            <button
              type="submit"
              disabled={loading || !orderId.trim()}
              className={`px-8 py-4 rounded-xl text-sm font-semibold active:scale-[0.98] transition-all duration-200 ${CTA_PRIMARY} shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 whitespace-nowrap`}
            >
              {loading ? 'Locating…' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm" role="alert">
              <p className="flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠</span> {error}
              </p>
            </div>
          )}

          {trackedOrder && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-6 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Order #{trackedOrder.id}</h2>
                  <p className="text-sm text-slate-500 mt-1">Placed on {trackedOrder.date}</p>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <p className="text-sm text-slate-500">Expected Delivery</p>
                  <p className="text-lg font-semibold text-brand-700">{trackedOrder.expectedDelivery}</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative my-12">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
                  <div
                    style={{ width: `${(trackedOrder.statusIndex / (STATUSES.length - 1)) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-600 transition-all duration-1000 ease-out"
                  ></div>
                </div>
                <div className="flex justify-between w-full">
                  {STATUSES.map((status, index) => {
                    const isCompleted = index <= trackedOrder.statusIndex;
                    const isCurrent = index === trackedOrder.statusIndex;
                    return (
                      <div key={status} className="flex flex-col items-center">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center -mt-9 sm:-mt-10 border-4 border-white shadow-sm transition-colors duration-500 ${isCompleted ? 'bg-brand-600 text-white' : 'bg-slate-200'}`}>
                          {isCompleted && (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <span className={`mt-4 text-xs sm:text-sm font-medium ${isCurrent ? 'text-brand-700 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                          {status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Items in Order</h3>
                <ul className="divide-y divide-slate-200">
                  {trackedOrder.items.map((item, idx) => (
                    <li key={idx} className="py-3 flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span className="font-medium text-slate-900">{item.name}</span>
                        <span className="ml-2 text-slate-500">x{item.quantity}</span>
                      </div>
                      <span className="text-slate-700 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {isAuthenticated && myOrders.length > 0 && (
            <div className="mt-16 border-t border-slate-200 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-display font-semibold text-slate-900 mb-6">My Purchase History</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {myOrders.map(order => (
                  <div key={order.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-slate-900">{order.id}</p>
                        <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded shadow-sm ${order.status==='Pending'?'bg-amber-100 text-amber-800':order.status==='Delivered'?'bg-green-100 text-green-800':'bg-brand-100 text-brand-800'}`}>
                        {order.status}
                      </span>
                    </div>
                    <ul className="text-sm text-slate-700 divide-y divide-slate-200 mb-5 flex-1">
                      {order.items.map((item, idx) => (
                         <li key={idx} className="py-2 flex justify-between">
                            <span className="truncate pr-4" title={item.name}>{item.name}</span>
                            <span className="text-slate-500 whitespace-nowrap">x{item.qty}</span>
                         </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200">
                      <button 
                        onClick={() => {
                          setOrderId(order.id)
                          performSearch(order.id)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }} 
                        className="flex-1 py-2 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 transition shadow-sm text-slate-700"
                      >
                        Track
                      </button>
                      {order.status === 'Pending' && (
                        <button onClick={() => {
                          if(window.confirm('Are you sure you want to cancel this order?')) {
                            const saved = JSON.parse(localStorage.getItem('admin_orders') || '[]')
                            const updated = saved.filter(o => o.id !== order.id)
                            localStorage.setItem('admin_orders', JSON.stringify(updated))
                            setMyOrders(updated.filter(o => o.customer?.email === user.email))
                            if (trackedOrder?.id === order.id) setTrackedOrder(null)
                            // Dispatch event so Admin Dashboard updates if open in another tab
                            window.dispatchEvent(new Event('storage'))
                          }
                        }} className="flex-1 py-2 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition shadow-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
