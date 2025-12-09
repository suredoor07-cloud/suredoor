'use client'

import { useState } from 'react'
import { Mail, MailOpen, Trash2, Reply, Search, Filter } from 'lucide-react'

const initialMessages = [
  {
    id: '1',
    name: 'John Adeyemi',
    email: 'john.adeyemi@email.com',
    subject: 'Partnership Inquiry',
    message: 'Hello, I represent a corporate organization interested in partnering with Suredoor International for our CSR initiatives. We would like to discuss potential collaboration opportunities.',
    read: false,
    date: '2024-12-08T10:30:00',
  },
  {
    id: '2',
    name: 'Mary Okonkwo',
    email: 'mary.o@email.com',
    subject: 'Volunteer Application',
    message: 'I am a university student looking to volunteer with your organization during the upcoming holiday season. Please let me know how I can get involved.',
    read: false,
    date: '2024-12-07T14:15:00',
  },
  {
    id: '3',
    name: 'Emmanuel Peters',
    email: 'emmanuel.p@email.com',
    subject: 'Donation Receipt Request',
    message: 'I made a donation last week and would like to request an official receipt for tax purposes. My donation reference is DON-2024-1234.',
    read: true,
    date: '2024-12-06T09:45:00',
  },
  {
    id: '4',
    name: 'Grace Adekunle',
    email: 'grace.a@email.com',
    subject: 'Program Information',
    message: 'I would like more information about your youth empowerment programs. My community has many young people who could benefit from skill acquisition training.',
    read: true,
    date: '2024-12-05T16:20:00',
  },
  {
    id: '5',
    name: 'David Obi',
    email: 'david.obi@email.com',
    subject: 'Media Coverage Request',
    message: 'I am a journalist with The Guardian Nigeria. We would like to feature Suredoor International in our upcoming series on impactful NGOs. Please contact me to arrange an interview.',
    read: false,
    date: '2024-12-04T11:00:00',
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRead, setFilterRead] = useState('all')

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      filterRead === 'all' || 
      (filterRead === 'unread' && !msg.read) ||
      (filterRead === 'read' && msg.read)
    return matchesSearch && matchesFilter
  })

  const handleSelectMessage = (message: typeof initialMessages[0]) => {
    setSelectedMessage(message)
    if (!message.read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ))
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id
                    ? 'bg-primary-50'
                    : message.read
                    ? 'hover:bg-gray-50'
                    : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.read ? 'bg-gray-100' : 'bg-primary-100'
                  }`}>
                    {message.read ? (
                      <MailOpen className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Mail className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`font-medium truncate ${message.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {message.name}
                      </p>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(message.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${message.read ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-400 truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No messages found
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
                  <p className="text-gray-500 mt-1">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedMessage.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="Reply"
                  >
                    <Reply className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="border-t pt-6">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
                >
                  <Reply className="w-5 h-5" />
                  Reply to Message
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
