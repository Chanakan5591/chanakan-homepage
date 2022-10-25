import { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'

const AboutMe: React.FC = () => {
  const control = useAnimation()
  const [ref, inView] = useInView()

  const boxVariant = {
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hidden: { y: 100, opacity: 0, scale: 1 },
  }

  useEffect(() => {
    if (inView) {
      control.start('visible')
    } else {
      control.start('hidden')
    }
  }, [control, inView])
  return (
    <section className={`flex flex-col text-black py-20 text-3xl md:text-4xl bg-white`}>
      <div className='container mx-auto px-11'>
        <motion.p ref={ref} variants={boxVariant} animate={control} initial="hidden" className='leading-tight max-w-5xl mx-auto text-4xl tracking-tight'>
          <strong>About Me</strong><br />
          Hello! I am Chanakan Mungtin. I am a passionate developer resided in Thailand. I am still a student. I am currently learning React and Tailwind CSS, which lead me to make this website.<br />
        </motion.p>
      </div>
    </section>
  )
}

export default AboutMe
