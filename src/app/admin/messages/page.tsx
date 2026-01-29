'use client'

import { useState, useEffect } from 'react'
import { Mail, MailOpen, Trash2, Reply, Search, Loader2 } from 'lucide-react'
import { messagesService, ContactMessage } from '@/lib/supabase'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRead, setFilterRead] = useState('all')
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyData, setReplyData] = useState({ subject: '', message: '' })
  const [isSendingReply, setIsSendingReply] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const data = await messagesService.getAll()
      setMessages(data)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.read) {
      try {
        await messagesService.markAsRead(message.id)
        setMessages(messages.map(m => 
          m.id === message.id ? { ...m, read: true } : m
        ))
      } catch (error) {
        console.error('Error marking message as read:', error)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await messagesService.delete(id)
        setMessages(messages.filter(m => m.id !== id))
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  const handleOpenReply = (message: ContactMessage) => {
    setReplyData({
      subject: `Re: ${message.subject}`,
      message: `\n\n---\nOriginal message from ${message.name} (${message.email}):\n${message.message}`
    })
    setShowReplyModal(true)
  }

  const handleSendReply = async () => {
    if (!selectedMessage) return
    
    setIsSendingReply(true)
    try {
      // Open default email client with pre-filled data
      const mailtoLink = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(replyData.subject)}&body=${encodeURIComponent(replyData.message)}`
      window.location.href = mailtoLink
      
      // Close modal after a short delay
      setTimeout(() => {
        setShowReplyModal(false)
        setReplyData({ subject: '', message: '' })
        setIsSendingReply(false)
      }, 1000)
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Failed to open email client. Please try again.')
      setIsSendingReply(false)
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

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
                        {new Date(message.created_at).toLocaleDateString()}
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
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenReply(selectedMessage)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="Reply"
                  >
                    <Reply className="w-5 h-5" />
                  </button>
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
                <button
                  onClick={() => handleOpenReply(selectedMessage)}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
                >
                  <Reply className="w-5 h-5" />
                  Reply to Message
                </button>
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

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Reply to Message</h2>
                  <p className="text-sm text-gray-500 mt-1">To: {selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={replyData.subject}
                  onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={replyData.message}
                  onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Write your reply..."
                />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                This will open your email client to send the reply.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={isSendingReply || !replyData.subject || !replyData.message}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  {isSendingReply ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Reply className="w-5 h-5" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
