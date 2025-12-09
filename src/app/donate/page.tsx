'use client'

import { useState } from 'react'
import { Heart, CreditCard, Building, Smartphone, CheckCircle, Shield, Users, Target } from 'lucide-react'

const donationAmounts = [1000, 5000, 10000, 25000, 50000, 100000]

const impactItems = [
  {
    amount: '₦5,000',
    description: 'Provides school supplies for 5 children',
    icon: Target,
  },
  {
    amount: '₦10,000',
    description: 'Feeds a family for one month',
    icon: Heart,
  },
  {
    amount: '₦25,000',
    description: 'Sponsors skill training for one youth',
    icon: Users,
  },
  {
    amount: '₦50,000',
    description: 'Supports a community health seminar',
    icon: Shield,
  },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile'>('card')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    anonymous: false,
    message: '',
  })

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle donation submission
    alert('Thank you for your donation! This is a demo - payment integration coming soon.')
  }

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 text-secondary-400" />
              <span className="text-white text-sm font-medium">Make a Difference</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Generosity <span className="text-secondary-400">Changes Lives</span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Every donation, no matter the size, helps us continue our mission of restoring 
              dignity and empowering communities across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            {impactItems.map((item, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                <item.icon className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-primary-600 mb-2">{item.amount}</div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Donation Type */}
              <div className="p-8 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Donation Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      donationType === 'one-time'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">One-Time</div>
                    <div className="text-sm text-gray-500">Single donation</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      donationType === 'monthly'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">Monthly</div>
                    <div className="text-sm text-gray-500">Recurring support</div>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="p-8 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Amount</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAmount === amount
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">₦{amount.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-8 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-primary-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Card</div>
                      <div className="text-xs text-gray-500">Debit/Credit</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'bank'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <Building className="w-6 h-6 text-primary-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Bank Transfer</div>
                      <div className="text-xs text-gray-500">Direct transfer</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'mobile'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-primary-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Mobile Money</div>
                      <div className="text-xs text-gray-500">USSD/Mobile</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="p-8 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Leave a Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Share why you're donating..."
                  />
                </div>
                
                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">Make my donation anonymous</span>
                  </label>
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="p-8 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation
                    </div>
                    <div className="text-3xl font-bold text-primary-600">
                      ₦{finalAmount.toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!finalAmount}
                    className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold py-4 px-12 rounded-full transition-all duration-300 w-full md:w-auto"
                  >
                    <Heart className="w-5 h-5" />
                    Complete Donation
                  </button>
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-secondary mb-6">Why Donate to Suredoor?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparent</h3>
                <p className="text-gray-600 text-sm">We provide regular updates on how your donations are used.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
                <p className="text-gray-600 text-sm">Your personal and payment information is always protected.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Impactful</h3>
                <p className="text-gray-600 text-sm">Every naira goes directly to supporting our programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
