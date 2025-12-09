'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { programsService, Program } from '@/lib/supabase'

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const data = await programsService.getAll()
      setPrograms(data || [])
    } catch (error) {
      console.error('Error loading programs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || program.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      try {
        await programsService.delete(id)
        setPrograms(programs.filter(p => p.id !== id))
      } catch (error) {
        console.error('Error deleting program:', error)
        alert('Error deleting program')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  const getDepartmentLabel = (dept: string) => {
    const labels: Record<string, string> = {
      public_enlightenment: 'Public Enlightenment',
      women: 'Women',
      youth: 'Youth',
    }
    return labels[dept] || dept
  }

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      public_enlightenment: 'bg-blue-100 text-blue-700',
      women: 'bg-pink-100 text-pink-700',
      youth: 'bg-purple-100 text-purple-700',
    }
    return colors[dept] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
          <p className="text-gray-500 mt-1">Manage your programs and initiatives</p>
        </div>
        <Link
          href="/admin/programs/new"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Program
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="public_enlightenment">Public Enlightenment</option>
            <option value="women">Women</option>
            <option value="youth">Youth</option>
          </select>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Program</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Department</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{program.title}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{program.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-sm font-medium ${getDepartmentColor(program.department)}`}>
                      {getDepartmentLabel(program.department)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-sm font-medium ${
                      program.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {program.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/programs/${program.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/programs/edit/${program.id}`}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(program.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No programs found</p>
          </div>
        )}
      </div>
    </div>
  )
}
