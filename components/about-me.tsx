import React from 'react'

const AboutMe: React.FC = () => {
  return (

    <section className={`flex flex-col text-black py-20 text-3xl md:text-4xl bg-white`}>
      <div className='container mx-auto px-11'>
        <p className='leading-tight max-w-5xl mx-auto text-4xl tracking-tight'>
          <strong>About Me</strong><br />
          Hello! I am Chanakan Mungtin. I am a passionate developer resided in Thailand. I am still a student. I am currently learning React and Tailwind CSS, which lead me to make this website.<br />
        </p>
      </div>
    </section>
  )
}

export default AboutMe
