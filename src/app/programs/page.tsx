'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, Users, Target, Lightbulb, HandHeart, GraduationCap, Loader2 } from 'lucide-react'
import { programsService, Program } from '@/lib/supabase'

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const data = await programsService.getActive()
      setPrograms(data || [])
    } catch (error) {
      console.error('Error loading programs:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const departments = [
    {
      title: 'Public Enlightenment Department',
      slug: 'public-enlightenment',
      description: 'The oldest unit involved in Public Enlightenment Campaign aimed at sensitizing people on topical issues of great importance.',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-700',
      activities: [
        'Seminars and Workshops',
        'Open-air activities',
        'Talk shows',
        'Coffee Morning meetings',
        'Conferences',
        'One on One Interactions',
      ],
    },
    {
      title: 'Women Department',
      slug: 'women',
      description: 'Creating the necessary awareness amongst women in most issues affecting the female folk.',
      icon: Heart,
      color: 'from-pink-500 to-pink-700',
      activities: [
        'Family affairs education',
        'Reproductive health education',
        'Skill acquisition training',
        'Civic responsibilities awareness',
        'Good morals promotion',
        'Economic empowerment',
      ],
    },
    {
      title: 'Youth Department',
      slug: 'youth',
      description: 'Drawing up programmes that enhance youth\'s overall development to meet their moral, educational and social needs.',
      icon: Users,
      color: 'from-purple-500 to-purple-700',
      activities: [
        'Moral development programs',
        'Educational support',
        'Social skills training',
        'Career guidance',
        'Re-orientation programs',
        'Purpose-driven life coaching',
      ],
    },
  ]

  const proposedProjects = [
    {
      title: 'Relief / Reorientation',
      description: 'Providing assistance to the worse affected victims before drawing their attention to eradicating societal decadence. Supply of consumable items and other forms of services.',
      icon: HandHeart,
    },
    {
      title: 'Training Centres',
      description: 'Establishment of VOCATIONAL CENTRES where people will be given skills relevant to their areas of natural endowment, followed by Research/Farm settlements.',
      icon: GraduationCap,
    },
    {
      title: 'Economic Empowerment',
      description: 'Once beneficiaries acquire skills to earn a living, they become VANGUARDS of change to reach more people, establishing a labour pool to serve the public.',
      icon: Target,
    },
    {
      title: 'Integration',
      description: 'The whole process of redirecting the masses from negative paths to productive life, with beneficiaries contributing to the development of their communities.',
      icon: Lightbulb,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-medium">Our Programs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transforming Lives Through <span className="text-secondary-400">Action</span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Our comprehensive programs span across three distinctive departments, each focused on 
              specific segments of society to create lasting positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-primary mb-6">Our Three Departments</h2>
            <p className="text-gray-600 text-lg">
              From the initial drama outreach, the Commission has expanded its structure to serve 
              different segments of society through specialized departments.
            </p>
          </div>
          
          <div className="space-y-12">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className={`bg-gradient-to-br ${dept.color} p-8 md:p-12 text-white`}>
                    <dept.icon className="w-16 h-16 mb-6" />
                    <h3 className="text-3xl font-bold mb-4">{dept.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-8">
                      {dept.description}
                    </p>
                    <Link
                      href={`/programs/${dept.slug}`}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="p-8 md:p-12">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Key Activities</h4>
                    <ul className="space-y-4">
                      {dept.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-gray-700">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Programs from Database */}
      {programs.length > 0 && (
        <section className="section-padding bg-white border-t">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-primary mb-6">Active Programs</h2>
              <p className="text-gray-600 text-lg">
                Explore our current programs and initiatives making a difference in communities.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program) => (
                  <div key={program.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                    {program.image && (
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      program.department === 'public_enlightenment' ? 'bg-blue-100 text-blue-700' :
                      program.department === 'women' ? 'bg-pink-100 text-pink-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {program.department === 'public_enlightenment' ? 'Public Enlightenment' :
                       program.department === 'women' ? 'Women' : 'Youth'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{program.description}</p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Proposed Projects Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Four-Phased Project</span>
            </div>
            <h2 className="heading-primary mb-6">Proposed Projects</h2>
            <p className="text-gray-600 text-lg">
              With all the studies completed, the results have been used to articulate a FOUR PHASED 
              PROJECT of Relief/Reorientation, Training, Economic Empowerment and Integration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {proposedProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <project.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Projects Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">Special Initiative</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Peace We Bring & <span className="text-secondary-400">Shared Bond</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                For the first phase, a Ten-Track musical record dubbed &quot;PEACE WE BRING&quot; and a film 
                titled &quot;SHARED BOND&quot; will be used to carry out a public sensitization campaign.
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                The project will be mounted on sports spectrum because of the unifying effect sports 
                have on people. While the music shall promote love, peace and mutual respect among people, 
                the film will highlight the common bond humanity shares.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  Music for Peace
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  Film for Unity
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  Sports for Connection
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Campaign Goals</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span className="text-white/90">Promote love, peace and mutual respect among people</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="text-white/90">Highlight the common bond humanity shares</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <span className="text-white/90">Carry out campaign at national and international level</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <span className="text-white/90">Address the present chaos rocking the human community globally</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
