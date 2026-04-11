import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.floor(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Layout>
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center px-8 py-5">
        <div className="flex items-center gap-3">
          <motion.img
            src="https://cdn.poehali.dev/projects/f18b5393-5ab9-487f-9ec1-661db3925340/files/532db3eb-2090-4a91-a5a2-1aef97f53be1.jpg"
            alt="А3 логотип"
            className="w-10 h-10 rounded-lg object-cover brightness-125 contrast-110 drop-shadow-[0_0_8px_rgba(74,158,255,0.6)]"
            initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
          />
          <motion.span
            className="text-2xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Black Ops One', sans-serif", background: 'linear-gradient(135deg, #7CB9E8 0%, #4A9EFF 40%, #B8D4E8 80%, #7CB9E8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            {'ООО «А3 Групп»'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </header>
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all ${
              index === activeSection ? 'bg-white scale-150' : 'bg-gray-600'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30"
        style={{ scaleX }}
      />
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
          />
        ))}
      </div>
    </Layout>
  )
}