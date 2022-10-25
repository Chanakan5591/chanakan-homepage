import { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'

const Works: React.FC = () => {
  const control = useAnimation()
  const [ref, inView] = useInView()

  const boxVariant = {
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hidden: { y: -100, opacity: 0, scale: 1 },
  }

  useEffect(() => {
    if (inView) {
      control.start('visible')
    } else {
      control.start('hidden')
    }
  }, [control, inView])

  return (
    <section className={`flex flex-col text-white py-20 text-3xl md:text-4xl`}>
      <div className='container mx-auto px-11'>
        <motion.p ref={ref} variants={boxVariant} animate={control} initial="hidden" className='leading-tight max-w-5xl mx-auto text-4xl tracking-tight'>
          <strong>Works</strong><br />
          There is nothing here yet
        </motion.p>
      </div>
    </section>
  )
}

export default Works
