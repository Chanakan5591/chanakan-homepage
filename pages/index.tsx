import type { NextPage } from 'next'
import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import MastHead from '../components/masthead'
import AboutMe from '../components/about-me'
import Works from '../components/works'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chanakan Mungtin</title>
        <meta name="description" content="A Webpage for Chanakan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <MastHead />
      <AboutMe />
      <Works />
    </div>
  )
}

export default Home
