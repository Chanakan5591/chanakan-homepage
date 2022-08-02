import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />

      <script async src="https://analytics.chanakancloud.net/tracker.js" data-ackee-server="https://analytics.chanakancloud.net" data-ackee-domain-id="f6707833-45c2-477d-a4db-cd1f39d21733"></script>
    </>
  )
}

export default MyApp
