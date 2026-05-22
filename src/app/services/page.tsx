import Link from 'next/link'
import { Reveal } from '@/components/animations/Reveal'
import { sanityFetch } from '@/sanity/lib/client'
import { allServicesQuery } from '@/sanity/lib/queries'

interface IService {
  _id: string;
  title: string;
  description: string;
}

const FALLBACK_SERVICES: IService[] = [
  {
    _id: 'brand-identity',
    title: 'Brand Identity',
    description: 'A brand is more than a logo - it\'s what people remember when you\'re not in the room. We define how your brand looks, feels, and speaks, so it stays consistent and instantly recognizable. From visual systems to tone and positioning, everything is built to make your brand clear, credible, and hard to ignore.',
  },
  {
    _id: 'digital-presence',
    title: 'Digital Presence',
    description: 'Attention online isn\'t given - it\'s earned. We turn your brand into content and experiences people actually want to engage with. From scroll-stopping visuals to cohesive social media presence, we build a digital identity that attracts, connects, and keeps your audience coming back.',
  },
  {
    _id: 'conversion',
    title: 'Conversion',
    description: 'Getting attention is step one - turning it into action is where it counts. We design websites and user journeys that guide people from interest to decision, without friction. Through intuitive design and clear structure, every interaction is built to build trust and drive meaningful results.',
  },
]

export default async function ServicesPage() {
  const sanityServices = await sanityFetch<IService[]>({
    query: allServicesQuery,
    tags: ['service'],
  })

  const displayServices = sanityServices?.length > 0 ? sanityServices : FALLBACK_SERVICES

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      {/* Header */}
      <section className="py-20 md:py-32 bg-surface-container border-b border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <Reveal direction="none">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">WHAT WE DO</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-on-surface mb-8">
              SERVICES
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-on-surface-variant">
              We combine creative thinking with structured execution to build brands that actually work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-0">
            {displayServices.map((service, i) => (
              <Reveal key={service._id} direction="up" distance={30}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start py-16 md:py-24 border-b border-outline-variant/10 first:pt-0 last:border-0">
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary block">0{i + 1}</span>
                  </div>

                  {/* Title */}
                  <div className="lg:col-span-4">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-on-surface">{service.title}</h2>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-7">
                    <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-40 bg-surface-container text-center">
        <Reveal direction="up" distance={30}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-on-surface mb-6">LET&apos;S BUILD SOMETHING<br />THAT STANDS OUT.</h2>
            <p className="text-base text-on-surface-variant mb-10 max-w-lg mx-auto">Tell us what you&apos;re working on - we&apos;ll help you shape it into something that actually makes an impact.</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 text-[11px] font-bold tracking-[0.2em] uppercase bg-primary-container text-white rounded-sm hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
            >
              START A PROJECT →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
