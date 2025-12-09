import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Calendar, MapPin } from 'lucide-react'

const programsData = {
  'public-enlightenment': {
    title: 'Public Enlightenment Department',
    subtitle: 'Sensitizing People on Topical Issues',
    description: 'This is the oldest unit which is involved in Public Enlightenment Campaign aimed at sensitizing people on topical issues of great importance.',
    color: 'from-blue-500 to-blue-700',
    activities: [
      'Seminars',
      'Workshops',
      'Open-air activities',
      'Talk shows',
      'Coffee Morning meetings',
      'Conferences',
      'One on One Interactions',
    ],
    achievements: [
      {
        title: 'The Blaze of Anger',
        description: 'A stage drama used to douse the pent-up anger in youths (students) in 1989.',
        year: '1989',
      },
      {
        title: 'Rule or Be Ruled',
        description: 'A political enlightenment campaign carried out through the Lagos Island branch of the Pentecostal Fellowship Nigeria (PFN) from 1990 to 1992.',
        year: '1990-1992',
      },
      {
        title: 'FIFA World Youth Championship',
        description: 'Presentation of anthems at both the Opening and Closing Ceremonies of the FIFA organized Youth Soccer Championship tagged "NIGERIA 99".',
        year: '1999',
      },
      {
        title: 'Stakeholders Forum',
        description: 'Results from all studies and programmes for enlightenment were presented to the public at Centre Point Hall (Elephant House Plaza) at Obanikoro.',
        year: '2004',
      },
    ],
  },
  'women': {
    title: 'Women Department',
    subtitle: 'Empowering Women Across All Spheres',
    description: 'As one of the new arms, it has the responsibility of creating the necessary awareness amongst women in most issues affecting the female folk.',
    color: 'from-pink-500 to-pink-700',
    activities: [
      'Family affairs education',
      'Reproductive health education',
      'Training (Skill acquisition)',
      'Civic responsibilities awareness',
      'Good morals promotion',
      'Economic empowerment programs',
    ],
    achievements: [
      {
        title: 'Women Affairs Training',
        description: 'Women in Ketu participated in the Lagos State Ministry of Women Affairs and Poverty Alleviation training programme at the Lagos State Secretariat, Alausa Ikeja.',
        year: '2000-2002',
      },
      {
        title: 'Cooperative Venture',
        description: 'Women were engaged in co-operative venture of extracting cooking oil from groundnut on commercial scale.',
        year: '2000-2002',
      },
      {
        title: 'Clothing Materials Donation',
        description: 'Presentation of Clothing Materials to widows and orphans through the Headhigh International at SOS Village Isolo, Lagos.',
        year: '2005',
      },
    ],
  },
  'youth': {
    title: 'Youth Department',
    subtitle: 'Developing Tomorrow\'s Leaders',
    description: 'This unit draws up programmes that enhance youth\'s overall development to meet their moral, educational and social needs. It is also involved in redirecting their energy away from negative culture of crime to the right path of purpose driven life.',
    color: 'from-purple-500 to-purple-700',
    activities: [
      'Moral development programs',
      'Educational support initiatives',
      'Social skills training',
      'Career guidance and counseling',
      'Re-orientation programs',
      'Purpose-driven life coaching',
      'Sports and recreational activities',
    ],
    achievements: [
      {
        title: 'Skill Acquisition Programme',
        description: 'Thirteen (13) unemployed youths were given skill acquisition training with the help of the Lagos State Ministry of Youths, Sport and Social Development.',
        year: '2000',
      },
      {
        title: 'Peace Forum',
        description: 'Youth peace forum held in conjunction with the Pan African Christian Women Alliance (PACWA) at the Young Women Christian Association (YWCA) hall, Lagos.',
        year: '2000',
      },
      {
        title: 'Social Services',
        description: 'Participants in training were guided to render social services by organizing Reading and Spelling Programme for schools in Ketu area of Lagos State.',
        year: '2001',
      },
      {
        title: 'Re-orientation Programme',
        description: 'Four Months Re-orientation programme for youths (miscreants) at No 23 Adenola Street, Ketu, Lagos.',
        year: '2005',
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(programsData).map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const program = programsData[params.slug as keyof typeof programsData]
  if (!program) {
    return {
      title: 'Program Not Found - Suredoor International',
    }
  }
  return {
    title: `${program.title} - Suredoor International`,
    description: program.description,
  }
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programsData[params.slug as keyof typeof programsData]
  
  if (!program) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${program.color} py-20`}>
        <div className="container-custom">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Programs
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {program.title}
            </h1>
            <p className="text-white/90 text-xl mb-6">{program.subtitle}</p>
            <p className="text-white/80 text-lg leading-relaxed">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="heading-secondary mb-8">Key Activities</h2>
              <div className="space-y-4">
                {program.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="heading-secondary mb-8">Our Approach</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  We believe in a holistic approach to community development. Our programs are designed 
                  to address the root causes of societal challenges while providing practical solutions 
                  that empower individuals to take control of their lives.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Through collaboration with government agencies, community leaders, and other 
                  stakeholders, we ensure that our programs have lasting impact and reach those 
                  who need them most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-primary mb-6">Notable Achievements</h2>
            <p className="text-gray-600 text-lg">
              Over the years, this department has achieved significant milestones in its mission 
              to serve the community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {program.achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-2 text-primary-600 mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">{achievement.year}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Support This Program?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Your contribution can help us expand our reach and impact more lives. 
            Join us in making a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/30"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
