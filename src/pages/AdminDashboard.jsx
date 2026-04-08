import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CTA_PRIMARY } from '../config/brand'

const mockOrders = [
  {
    id: 'ORD-908A2',
    date: '2026-04-08T09:12:00Z',
    customer: {
      name: 'Dr. Kwame Mensah',
      facility: 'Kumasi Regional Hospital',
      email: 'kmensah@kumasiregional.gov.gh',
      phone: '+233 54 123 4567',
      address: 'Plot 4, Hospital Road, Kumasi, Ashanti Region'
    },
    items: [
      { name: 'Comprehensive First Aid Kit', qty: 150, price: 450.00 },
      { name: 'Daily Wellness Supplement Bulk', qty: 500, price: 120.00 },
      { name: 'Advanced Trauma Pack', qty: 25, price: 1200.00 }
    ],
    method: 'Mobile Money',
    status: 'Pending', // Pending, Processing, Shipped, Delivered
  },
  {
    id: 'ORD-908A1',
    date: '2026-04-07T14:45:00Z',
    customer: {
      name: 'Abena Osei',
      facility: 'Pharmacy Plus Distributors',
      email: 'procurement@pharmacyplus.com.gh',
      phone: '+233 20 987 6543',
      address: 'Spintex Road, Accra, Greater Accra'
    },
    items: [
      { name: 'Standard Emergency Kit', qty: 300, price: 250.00 },
      { name: 'Antiseptic Wipes (Case of 100)', qty: 50, price: 80.00 }
    ],
    method: 'Bank Transfer',
    status: 'Shipped',
  },
  {
    id: 'ORD-908A0',
    date: '2026-04-05T10:30:00Z',
    customer: {
      name: 'Emmanuel Dartey',
      facility: 'Individual',
      email: 'emmanuel.d@example.com',
      phone: '+233 24 555 1122',
      address: 'House 5, Ridge Estates, Takoradi, Western Region'
    },
    items: [
      { name: 'Standard Emergency Kit', qty: 2, price: 250.00 }
    ],
    method: 'Bank Card',
    status: 'Delivered',
  }
]

export default function AdminDashboard() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('admin_orders')
    if (saved) return JSON.parse(saved)
    localStorage.setItem('admin_orders', JSON.stringify(mockOrders))
    return mockOrders
  })
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [activeTab, setActiveTab] = useState('orders')

  // Listen for real-time orders globally (from same tab CustomEvent or cross-tab storage event)
  useEffect(() => {
    const handleStorageUpdate = () => {
      const saved = localStorage.getItem('admin_orders')
      if (saved) {
        setOrders(JSON.parse(saved))
      }
    }
    window.addEventListener('storage', handleStorageUpdate)
    window.addEventListener('order_placed', handleStorageUpdate)
    return () => {
      window.removeEventListener('storage', handleStorageUpdate)
      window.removeEventListener('order_placed', handleStorageUpdate)
    }
  }, [])

  // Sync back status updates to localStorage
  useEffect(() => {
    localStorage.setItem('admin_orders', JSON.stringify(orders))
  }, [orders])

  const calcTotal = (items) => items.reduce((sum, item) => sum + (item.qty * item.price), 0)

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const statusColors = {
    'Pending': 'bg-amber-100 text-amber-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800'
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-slate-300 md:shrink-0 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-display text-white tracking-wide">SysAdmin</h2>
          <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Management Portal</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => { setActiveTab('orders'); setSelectedOrder(null); }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition font-medium ${activeTab === 'orders' ? 'bg-brand-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <span>📦 Orders</span>
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('customers'); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition font-medium ${activeTab === 'customers' ? 'bg-brand-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
             👥 Customers
          </button>
          <button 
            onClick={() => { setActiveTab('analytics'); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition font-medium ${activeTab === 'analytics' ? 'bg-brand-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
             📊 Analytics
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition flex items-center gap-2">
            ← Back to Store
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {activeTab === 'customers' && (
          <div className="p-4 sm:p-8">
            <h1 className="text-2xl font-display text-slate-900">Customer Directory</h1>
            <p className="text-sm text-slate-600 mt-1 mb-8">View and manage registered clients and pharmaceutical facilities.</p>
            <div className="bg-white border border-slate-200 shadow-sm p-8 text-center text-slate-500">
              Customer CRM is currently disconnected. Future updates will map to Firebase Authentication. 
              <br/><br/>
              <em>In this demo, orders automatically capture guest details.</em>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-4 sm:p-8">
            <h1 className="text-2xl font-display text-slate-900">Analytics & Sales</h1>
            <p className="text-sm text-slate-600 mt-1 mb-8">Metrics across all regions over the last 30 days.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-slate-200 shadow-sm p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Total Dispatched</p>
                <p className="text-3xl font-display text-brand-700 mt-2">
                   {orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered').length} orders
                </p>
              </div>
              <div className="bg-white border border-slate-200 shadow-sm p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Pending Fulfillment</p>
                <p className="text-3xl font-display text-amber-600 mt-2">
                  {orders.filter(o => o.status === 'Pending').length} orders
                </p>
              </div>
              <div className="bg-white border border-slate-200 shadow-sm p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Gross Revenue</p>
                <p className="text-3xl font-display text-slate-900 mt-2">
                  GH₵ {orders.reduce((acc, order) => acc + calcTotal(order.items), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          selectedOrder ? (
            <div className="p-4 sm:p-8 max-w-4xl mx-auto">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-brand-700 hover:underline mb-6 text-sm font-semibold"
              >
                &larr; Back to Order List
              </button>

              <div className="bg-white border border-slate-200 shadow-sm p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <h1 className="text-2xl font-display text-slate-900">Receipt / Packing Slip</h1>
                    <p className="text-slate-500 mt-1">Order ID: {selectedOrder.id}</p>
                    <p className="text-slate-500 text-sm">Placed on: {new Date(selectedOrder.date).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                    <div className="mt-4 flex flex-col gap-2">
                      {selectedOrder.status === 'Pending' && (
                        <button onClick={() => updateStatus(selectedOrder.id, 'Shipped')} className={`text-xs ${CTA_PRIMARY} py-1.5 px-4`}>
                          Mark as Shipped
                        </button>
                      )}
                      {selectedOrder.status === 'Shipped' && (
                        <button onClick={() => updateStatus(selectedOrder.id, 'Delivered')} className={`text-xs ${CTA_PRIMARY} py-1.5 px-4`}>
                          Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Customer & Shipping</h3>
                    <p className="font-semibold text-slate-900">{selectedOrder.customer.name}</p>
                    {selectedOrder.customer.facility && <p className="text-slate-700">{selectedOrder.customer.facility}</p>}
                    <p className="text-slate-600 mt-2 whitespace-pre-wrap">{selectedOrder.customer.address}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Contact & Payment</h3>
                    <p className="text-slate-700">{selectedOrder.customer.email}</p>
                    <p className="text-slate-700">{selectedOrder.customer.phone}</p>
                    <p className="mt-3 font-medium text-slate-900">Paid via: {selectedOrder.method}</p>
                  </div>
                </div>

                <div className="py-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Line Items</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-sm text-slate-600">
                        <th className="py-2 font-medium">Item</th>
                        <th className="py-2 font-medium text-right">Qty</th>
                        <th className="py-2 font-medium text-right">Unit Price</th>
                        <th className="py-2 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="text-sm text-slate-800">
                          <td className="py-3 pr-2 font-medium">{item.name}</td>
                          <td className="py-3 px-2 text-right">{item.qty.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right">GH₵ {item.price.toFixed(2)}</td>
                          <td className="py-3 pl-2 text-right font-semibold text-slate-900">GH₵ {(item.qty * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-slate-800 font-bold text-slate-900 text-lg">
                        <td colSpan="3" className="py-4 text-right pr-4">Grand Total</td>
                        <td className="py-4 text-right">GH₵ {calcTotal(selectedOrder.items).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200 text-center text-sm text-slate-500">
                  <p>This is a formal packing slip for bulk distribution logistics.</p>
                  <button className="mt-2 text-brand-700 font-semibold underline" onClick={() => window.print()}>
                    Print Receipt / Packing Slip
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-8">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display text-slate-900">Incoming Orders</h1>
                  <p className="text-sm text-slate-600 mt-1">Manage bulk shipments, customer fulfillment, and receipts.</p>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className="px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4 text-right">Total (GH₵)</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {orders.sort((a,b) => new Date(b.date) - new Date(a.date)).map(order => (
                      <tr key={order.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                        <td className="px-6 py-4 text-slate-500">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">{order.customer.name}</p>
                          <p className="text-xs text-slate-500">{order.customer.facility}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-slate-900">
                          {calcTotal(order.items).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="text-brand-700 font-medium hover:underline"
                          >
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
