'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Sample gallery data - in production, this would come from Supabase
const galleryImages = [
  {
    id: '1',
    title: 'Interactive Session with V.I.O Officers',
    description: 'An interactive section with V.I.O Officers at their Head Quarter, Lagos State Secretariat Alausa, Ikeja Lagos.',
    category: 'Outreach',
  },
  {
    id: '2',
    title: 'Traffic Document Presentation',
    description: 'Presentation of Traffic Document by Lagos State Vehicle Inspection Officer at the Lagos State Secretariat Headquarters, Alausa Ikeja.',
    category: 'Outreach',
  },
  {
    id: '3',
    title: 'Red Cross Motherless Babies Home Visit',
    description: 'Group photograph with the Administrative Officer of Red Cross Motherless Babies Home (Mrs Gloria Chiekwe) and her Staff at No 2 Makoko Road, Yaba.',
    category: 'Donations',
  },
  {
    id: '4',
    title: 'Donation to Motherless Babies Home',
    description: 'Presentation of items to Matron of the Motherless Babies Home.',
    category: 'Donations',
  },
  {
    id: '5',
    title: 'Manza Village Outreach',
    description: 'Donation of items to people of Manza Village in Jos North East Local Government Area of Plateau State.',
    category: 'Donations',
  },
  {
    id: '6',
    title: 'Radio Lagos Visit',
    description: 'Group photograph with Radio Lagos Management Staff.',
    category: 'Partnerships',
  },
  {
    id: '7',
    title: 'Lagos State Art Council',
    description: 'Group photograph with Lagos State Art Council Management Staff.',
    category: 'Partnerships',
  },
  {
    id: '8',
    title: 'Community Outreach Program',
    description: 'Team members during a community outreach program.',
    category: 'Programs',
  },
  {
    id: '9',
    title: 'Youth Empowerment Workshop',
    description: 'Participants at our youth empowerment workshop.',
    category: 'Programs',
  },
  {
    id: '10',
    title: 'Women Health Seminar',
    description: 'Women attending our health education seminar.',
    category: 'Programs',
  },
  {
    id: '11',
    title: 'Skill Acquisition Training',
    description: 'Youth participants in skill acquisition training program.',
    category: 'Training',
  },
  {
    id: '12',
    title: 'Peace Forum Event',
    description: 'Participants at the Peace Forum organized for youth.',
    category: 'Events',
  },
]

const categories = ['All', 'Outreach', 'Donations', 'Partnerships', 'Programs', 'Training', 'Events']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-medium">Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Work in <span className="text-secondary-400">Pictures</span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Browse through our gallery to see the impact of our programs and the 
              communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => openLightbox(image, index)}
                className="relative aspect-square bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl overflow-hidden cursor-pointer group"
              >
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-6xl font-bold">S</span>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">{image.title}</h3>
                    <span className="text-white/70 text-xs">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <div className="max-w-4xl mx-auto px-16">
            <div className="aspect-video bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white/30 text-9xl font-bold">S</span>
            </div>
            <div className="text-center">
              <h2 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h2>
              <p className="text-white/70">{selectedImage.description}</p>
              <span className="inline-block mt-4 px-4 py-1 bg-white/10 rounded-full text-white/80 text-sm">
                {selectedImage.category}
              </span>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {currentIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Join us in making a difference. Your support helps us create more 
            moments of impact like these.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
            >
              Donate Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/30"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
