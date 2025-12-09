import Link from 'next/link'
import { Heart, Users, BookOpen, Target, ArrowRight, CheckCircle, Calendar, MapPin } from 'lucide-react'
import HeroSlider from '@/components/home/HeroSlider'

// About Section Component
function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">About Us</span>
            </div>
            
            <h2 className="heading-primary mb-6">
              A Legacy of <span className="text-gradient">Humanitarian Service</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Established in 1988, Suredoor International Centre for Research and Rehabilitation 
              (popularly known as &quot;The Commission&quot;) was born during a period of great clamour 
              among Nigerians for civil rule.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Perceiving the looming danger which eventually culminated into the students&apos; riot of 1989, 
              the Commission (then called Nigeria Youth Foundation) extended its operations from the 
              Church environment to the larger society through drama presentations like &quot;The Blaze of Anger&quot; 
              - a Peace Campaign carried out within Lagos State.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Re-orientating the masses towards purposeful living',
                'Assisting people to discover, develop and exploit their talents',
                'Enhancing economic prospects of communities',
                'Ensuring full participation in nation building',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Read Our Full Story
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full bg-primary-100 rounded-3xl"></div>
            <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                &quot;Our driving force is passion to bring back the dignity of man with the principles 
                of love, tolerance and mutual respect for one another.&quot;
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-secondary-400">3</div>
                  <div className="text-white/80 text-sm">Departments</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-secondary-400">1988</div>
                  <div className="text-white/80 text-sm">Year Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Programs Section Component
function ProgramsSection() {
  const programs = [
    {
      title: 'Public Enlightenment Department',
      description: 'The oldest unit involved in Public Enlightenment Campaign aimed at sensitizing people on topical issues through Seminars, Workshops, Open-air activities, Talk shows, and Conferences.',
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/programs/public-enlightenment',
    },
    {
      title: 'Women Department',
      description: 'Creating awareness amongst women on issues affecting the female folk - from family affairs, reproductive health education, skill acquisition, civic responsibilities to economic matters.',
      icon: Heart,
      color: 'bg-pink-500',
      link: '/programs/women',
    },
    {
      title: 'Youth Department',
      description: 'Drawing up programmes that enhance youth\'s overall development to meet their moral, educational and social needs, redirecting their energy from negative paths to purpose driven life.',
      icon: Users,
      color: 'bg-purple-500',
      link: '/programs/youth',
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Our Programs</span>
          </div>
          
          <h2 className="heading-primary mb-6">
            Three Distinctive <span className="text-gradient">Arms of Service</span>
          </h2>
          
          <p className="text-gray-600 text-lg">
            From the initial drama outreach, the Commission has expanded its structure to the present 
            level of having three distinctive departments serving different segments of society.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
              
              <Link
                href={program.link}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Impact Section Component
function ImpactSection() {
  const impacts = [
    {
      title: 'Ten-Year Research',
      description: 'Comprehensive research on the precarious situation in the country from 1989-1999, with results compiled in 2003.',
      year: '1989-1999',
    },
    {
      title: 'Skill Acquisition Programme',
      description: 'Thirteen unemployed youths were given skill acquisition training with the help of Lagos State Ministry of Youths.',
      year: '2000',
    },
    {
      title: 'Peace Forum',
      description: 'Youth peace forum held in conjunction with Pan African Christian Women Alliance at YWCA hall, Lagos.',
      year: '2000',
    },
    {
      title: 'Donation Drives',
      description: 'Materials donated to orphanages, refugee foundations, and victims of various disasters across Nigeria.',
      year: 'Ongoing',
    },
  ]

  return (
    <section className="section-padding bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Our Impact</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Making a <span className="text-secondary-400">Difference</span> Since 1988
          </h2>
          
          <p className="text-white/80 text-lg">
            Through various programmes and initiatives, we have touched thousands of lives 
            and continue to work towards a better society.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-secondary-400 font-bold text-sm mb-4">{impact.year}</div>
              <h3 className="text-xl font-bold mb-3">{impact.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section Component
function CTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Your support can help us continue our mission of restoring dignity and 
              empowering communities across Nigeria. Every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 bg-white text-secondary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border-2 border-white"
              >
                Get Involved
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Events Section Component
function EventsSection() {
  const events = [
    {
      title: 'Community Outreach Program',
      date: 'December 15, 2024',
      location: 'Lagos State',
      description: 'Join us for our annual community outreach program bringing hope to underserved communities.',
    },
    {
      title: 'Youth Empowerment Workshop',
      date: 'January 10, 2025',
      location: 'Ikeja, Lagos',
      description: 'A comprehensive workshop focused on skill development and career guidance for young people.',
    },
    {
      title: 'Women\'s Health Seminar',
      date: 'January 25, 2025',
      location: 'Yaba, Lagos',
      description: 'Educational seminar on reproductive health and family wellness for women.',
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium">Upcoming Events</span>
            </div>
            <h2 className="heading-secondary">Join Our <span className="text-gradient">Upcoming Events</span></h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white/50" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main Home Page
export default function Home() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <EventsSection />
      <CTASection />
    </>
  )
}
