import { CheckCircle, Target, Eye, Users, Heart, BookOpen, Award } from 'lucide-react'

export const metadata = {
  title: 'About Us - Suredoor International',
  description: 'Learn about Suredoor International Centre for Research and Rehabilitation, our history, mission, vision, and the work we do.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-medium">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Story of <span className="text-secondary-400">Hope & Service</span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              For over three decades, Suredoor International has been at the forefront of 
              humanitarian service, touching lives and transforming communities across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-secondary mb-6">
                Suredoor International Centre for Research and Rehabilitation
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Suredoor International Centre for Research and Rehabilitation is a humanitarian body 
                  that has the task of restoring the dignity of &quot;man&quot;. A task the registered outfit pursues 
                  through many socio-cultural programmes aimed at redirecting members of the public from 
                  destructive paths to purpose living.
                </p>
                <p>
                  The &apos;Commission&apos; as the Organization is popularly known was established in 1988 at the 
                  period there was a great clamour among the Nigerian citizenry for a Civil Rule.
                </p>
                <p>
                  Thus, perceiving the looming danger which eventually culminated into the students&apos; riot 
                  of 1989, the Commission called at that time the <strong>Nigeria Youth Foundation</strong>, 
                  extended its operations from the Church environment where it started as a drama group to 
                  the larger society.
                </p>
                <p>
                  Through drama presentation titled <strong>&quot;The Blaze Of Anger&quot;</strong> a Peace Campaign 
                  was carried out within Lagos State.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-secondary-100 rounded-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-primary-50 rounded-2xl">
                    <div className="text-4xl font-bold text-primary-600 mb-2">1988</div>
                    <div className="text-gray-600 text-sm">Year Established</div>
                  </div>
                  <div className="text-center p-6 bg-secondary-50 rounded-2xl">
                    <div className="text-4xl font-bold text-secondary-600 mb-2">35+</div>
                    <div className="text-gray-600 text-sm">Years of Service</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-2xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                    <div className="text-gray-600 text-sm">Departments</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-2xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                    <div className="text-gray-600 text-sm">Lives Touched</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Our Objectives</span>
            </div>
            <h2 className="heading-primary mb-6">What We Aim to Achieve</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Re-orientating the Masses',
                description: 'Guiding members of the public towards purposeful living through education and awareness programs.',
                icon: BookOpen,
              },
              {
                title: 'Talent Discovery & Development',
                description: 'Assisting individuals to discover, develop and exploit their talents for personal and societal benefit.',
                icon: Award,
              },
              {
                title: 'Economic Enhancement',
                description: 'Enhancing the economic prospects of communities through skill acquisition and empowerment programs.',
                icon: Target,
              },
              {
                title: 'Nation Building',
                description: 'Ensuring full participation of all citizens in the development and building of our nation.',
                icon: Users,
              },
            ].map((objective, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <objective.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{objective.title}</h3>
                <p className="text-gray-600 leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Our Vision</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bringing Back the <span className="text-secondary-400">Dignity of Man</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                &quot;Our driving force is passion to bring back the dignity of man with the principles 
                of love, tolerance and mutual respect for one another.&quot;
              </p>
              <div className="space-y-4">
                {['Love', 'Tolerance', 'Mutual Respect'].map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary-400" />
                    <span className="text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compassion</h4>
                    <p className="text-white/70 text-sm">We approach every situation with empathy and understanding.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="text-white/70 text-sm">We believe in the power of collective action and unity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Excellence</h4>
                    <p className="text-white/70 text-sm">We strive for the highest standards in all our endeavors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Our Structure</span>
            </div>
            <h2 className="heading-primary mb-6">Three Distinctive Arms</h2>
            <p className="text-gray-600 text-lg">
              From the initial drama outreach, the Commission has expanded its structure to the present 
              level of having three distinctive arms: PUBLIC ENLIGHTENMENT, WOMEN and YOUTH departments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <BookOpen className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Public Enlightenment</h3>
              <p className="text-white/90 leading-relaxed">
                The oldest unit involved in Public Enlightenment Campaign aimed at sensitizing people 
                on topical issues of great importance through Seminars, Workshops, Open-air activities, 
                Talk shows, Coffee Morning meetings, Conferences and One on One Interactions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl p-8 text-white">
              <Heart className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Women Department</h3>
              <p className="text-white/90 leading-relaxed">
                Creating the necessary awareness amongst women in most issues affecting the female folk. 
                These range from family affairs, reproductive health education, training (Skill acquisition), 
                civic responsibilities, good morals to economic matters.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-white">
              <Users className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Youth Department</h3>
              <p className="text-white/90 leading-relaxed">
                Drawing up programmes that enhance youth&apos;s overall development to meet their moral, 
                educational and social needs. Also involved in redirecting their energy away from 
                negative culture of crime to the right path of purpose driven life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
