'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Empowering Youth for Tomorrow Challenges',
    subtitle: 'Youth Development Programs',
    description: 'We draw up programmes that enhance youth\'s overall development to meet their moral, educational and social needs, redirecting their energy to purpose driven life.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Our Programs', href: '/programs', icon: ArrowRight },
    secondaryCta: { text: 'Get Involved', href: '/contact' },
  },
  {
    id: 2,
    title: 'Restoring the Dignity of Human-kind',
    subtitle: 'Serving humanity since 1988',
    description: 'Suredoor International Centre for Research and Rehabilitation is a humanitarian body dedicated to redirecting members of the public from destructive paths to purpose living.',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Donate Now', href: '/donate', icon: Heart },
    secondaryCta: { text: 'Learn More', href: '/about' },
  },
  {
    id: 3,
    title: 'Uplifting Women & Families',
    subtitle: 'Women Empowerment Initiative',
    description: 'Creating awareness amongst women on issues affecting the female folk - from family affairs, reproductive health education, skill acquisition to economic matters.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Support Us', href: '/donate', icon: Heart },
    secondaryCta: { text: 'Learn More', href: '/programs/women' },
  },
  {
    id: 4,
    title: 'Building Stronger Communities',
    subtitle: 'Public Enlightenment Campaign',
    description: 'Sensitizing people on topical issues through Seminars, Workshops, Open-air activities, Talk shows, and Conferences for a better society.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Join Us', href: '/contact', icon: ArrowRight },
    secondaryCta: { text: 'View Gallery', href: '/gallery' },
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  const slide = slides[currentSlide]

  return (
    <section 
      className="relative h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            {/* Subtitle Badge */}
            <div 
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 transition-all duration-500 ${
                isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">{slide.subtitle}</span>
            </div>

            {/* Title */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-500 ${
                isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {slide.title.split(' ').map((word, i) => (
                <span key={i}>
                  {word === 'Dignity' || word === 'Youth' || word === 'Women' || word === 'Communities' || word === 'Human-kind' || word === 'Challenges' ? (
                    <span className="text-secondary-400">{word}</span>
                  ) : (
                    word
                  )}{' '}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p 
              className={`text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl transition-all duration-500 ${
                isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {slide.description}
            </p>

            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
                isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link
                href={slide.cta.href}
                className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <slide.cta.icon className="w-5 h-5" />
                {slide.cta.text}
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/30 hover:border-white/50"
              >
                {slide.secondaryCta.text}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div 
              className={`grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 max-w-lg transition-all duration-500 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary-400">35+</div>
                <div className="text-white/60 text-sm">Years of Service</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary-400">10K+</div>
                <div className="text-white/60 text-sm">Lives Impacted</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary-400">50+</div>
                <div className="text-white/60 text-sm">Programs Run</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-10 h-3 bg-secondary-400'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-secondary-400 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}
