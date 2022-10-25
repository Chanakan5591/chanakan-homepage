import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import Chanakan from '../public/images/chanakan.jpg'
import styles from '../styles/ContactMe.module.css'
import axios from 'axios'

const ContactMe: React.FC = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: ''
  })
  const handleOnChange = useCallback((e: any) => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }, [])

  const handleServerResponse = useCallback((ok: any, msg: any) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg }
      })
      setInputs({
        name: '',
        email: '',
        message: ''
      })
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg }
      })
    }
  }, [])

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault()
      setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
      axios({
        method: 'POST',
        url: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT_URL,
        data: inputs
      }).then(_response => {
        handleServerResponse(
          true,
          'Thank you, Your message have been submitted!'
        )
      })
    }, [inputs, handleServerResponse])

  return (
    <div className={`bg-black text-white flex flex-col justify-center items-center pt-10 min-h-screen ${styles.contactsection}`}>
      <div className={`pl-10 pr-10 pt-2 backdrop-blur min-w-[23em] shadow-[0_40px_40px_rgba(0,0,0,0.25)] rounded-3xl ${styles.formcard}`}>
        <div className='rounded-full items-center justify-center flex flex-col '>
        </div>
        <div className='rounded-full pt-10 items-center justify-center flex flex-col '>
          <Image
            width="150"
            height="160"
            layout='fixed'
            placeholder='blur'
            priority={true}
            className='rounded-full border-solid border-4'
            src={Chanakan}
            alt='Profile Image' />
        </div>

        <div className={`p-12 -mt-7 font-bold text-black text-center ${styles.head}`}>
          <h1 className={`mb-10 text-white text-2xl ${styles.head}`}>Contact Me</h1>
          <form onSubmit={handleSubmit}>
            {status.info.error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                <strong className="font-bold">Error</strong>:{' '}
                <span className='block sm:inline'>{status.info.msg}</span>
              </div>
            )}
            {status.submitted ? (
              <div className='text-white text-xl font-bold px-4 py-3 rounded relative' role='alert'>Your message has been successfully sent. I will be reaching out to you soon</div>
            ) : (
              <>
                <input id='name' name='name' required maxLength={128} type='text' placeholder='Your Name' className={`outline-none rounded-lg px-8 py-2 ${styles.inputbox} min-w-[12em] w-full`} onChange={handleOnChange} value={inputs.name} /><br />
                <input id='email' name='email' type='email' required maxLength={128} placeholder='Email Address' className={`outline-none rounded-lg px-8 mt-5 py-2 ${styles.inputbox} min-w-[12em] w-full`} onChange={handleOnChange} value={inputs.email} /><br />
                <textarea id='message' name='message' placeholder='Message' required className={`outline-none rounded-lg px-8 py-2 mt-5 ${styles.inputbox} min-h-[16em] min-w-[12em] w-full`} onChange={handleOnChange} value={inputs.message}></textarea>
                <div className='text-center mt-10'>
                  <button type='submit' aria-required className={`text-black rounded-3xl px-8 py-2 ${styles.button} min-w-[12em] w-full`}>
                    {!status.submitting ? !status.submitted ? 'Submit' : 'Submitted' : 'Submitting...'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

    </div>
  )
}

export default ContactMe
