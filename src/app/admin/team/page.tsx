'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, User, X } from 'lucide-react'

const initialMembers = [
  {
    id: '1',
    name: 'Dr. Adebayo Johnson',
    role: 'Executive Director',
    bio: 'Over 30 years of experience in humanitarian work and community development.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    active: true,
  },
  {
    id: '2',
    name: 'Mrs. Folake Adeyemi',
    role: 'Director, Women Department',
    bio: 'Passionate advocate for women empowerment and gender equality.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200',
    active: true,
  },
  {
    id: '3',
    name: 'Mr. Chukwuemeka Obi',
    role: 'Director, Youth Department',
    bio: 'Dedicated to youth development and skill acquisition programs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    active: true,
  },
  {
    id: '4',
    name: 'Mrs. Amina Ibrahim',
    role: 'Director, Public Enlightenment',
    bio: 'Expert in public awareness campaigns and community engagement.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    active: true,
  },
  {
    id: '5',
    name: 'Mr. Oluwaseun Bakare',
    role: 'Program Coordinator',
    bio: 'Coordinates various programs and initiatives across departments.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    active: true,
  },
]

export default function TeamManagement() {
  const [members, setMembers] = useState(initialMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<typeof initialMembers[0] | null>(null)

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setMembers(members.filter(m => m.id !== id))
    }
  }

  const handleEdit = (member: typeof initialMembers[0]) => {
    setEditingMember(member)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingMember(null)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500 mt-1">Manage your organization&apos;s team</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                <p className="text-sm text-primary-600">{member.role}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4 line-clamp-2">{member.bio}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                member.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {member.active ? 'Active' : 'Inactive'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No team members found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={editingMember?.name || ''}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={editingMember?.role || ''}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  defaultValue={editingMember?.bio || ''}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Short biography"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                <input
                  type="text"
                  defaultValue={editingMember?.image || ''}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors"
              >
                {editingMember ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
