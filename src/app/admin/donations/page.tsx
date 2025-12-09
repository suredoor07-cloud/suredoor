'use client'

import { useState } from 'react'
import { Heart, TrendingUp, Calendar, Search, Download, Eye } from 'lucide-react'

const donations = [
  {
    id: '1',
    donor: 'Anonymous',
    email: 'hidden@email.com',
    amount: 50000,
    type: 'one-time',
    date: '2024-12-08T10:30:00',
    message: 'Keep up the good work!',
    anonymous: true,
  },
  {
    id: '2',
    donor: 'Chinedu Okafor',
    email: 'chinedu.o@email.com',
    amount: 100000,
    type: 'monthly',
    date: '2024-12-07T14:15:00',
    message: 'Happy to support your mission.',
    anonymous: false,
  },
  {
    id: '3',
    donor: 'Fatima Ibrahim',
    email: 'fatima.i@email.com',
    amount: 25000,
    type: 'one-time',
    date: '2024-12-06T09:45:00',
    message: '',
    anonymous: false,
  },
  {
    id: '4',
    donor: 'Corporate Donor Ltd',
    email: 'csr@corporate.com',
    amount: 500000,
    type: 'one-time',
    date: '2024-12-05T16:20:00',
    message: 'Annual CSR contribution for youth programs.',
    anonymous: false,
  },
  {
    id: '5',
    donor: 'Anonymous',
    email: 'hidden@email.com',
    amount: 10000,
    type: 'monthly',
    date: '2024-12-04T11:00:00',
    message: '',
    anonymous: true,
  },
]

const stats = [
  { label: 'Total Donations', value: '₦2,850,000', change: '+23%', icon: Heart },
  { label: 'This Month', value: '₦685,000', change: '+15%', icon: TrendingUp },
  { label: 'Monthly Donors', value: '12', change: '+3', icon: Calendar },
]

export default function DonationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedDonation, setSelectedDonation] = useState<typeof donations[0] | null>(null)

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || donation.type === filterType
    return matchesSearch && matchesType
  })

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-500 mt-1">Track and manage donations</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search donors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Donor</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {donation.anonymous ? 'Anonymous' : donation.donor}
                      </p>
                      {!donation.anonymous && (
                        <p className="text-sm text-gray-500">{donation.email}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary-600">
                      ₦{donation.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-sm font-medium ${
                      donation.type === 'monthly'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {donation.type === 'monthly' ? 'Monthly' : 'One-time'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(donation.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t">
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-900">Total</td>
                <td className="px-6 py-4 font-bold text-primary-600">
                  ₦{totalAmount.toLocaleString()}
                </td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No donations found</p>
          </div>
        )}
      </div>

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Donation Details</h3>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Donor</p>
                <p className="font-medium text-gray-900">
                  {selectedDonation.anonymous ? 'Anonymous' : selectedDonation.donor}
                </p>
              </div>
              
              {!selectedDonation.anonymous && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{selectedDonation.email}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-primary-600">
                  ₦{selectedDonation.amount.toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium text-gray-900 capitalize">{selectedDonation.type}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(selectedDonation.date).toLocaleString()}
                </p>
              </div>
              
              {selectedDonation.message && (
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="font-medium text-gray-900">{selectedDonation.message}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedDonation(null)}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
