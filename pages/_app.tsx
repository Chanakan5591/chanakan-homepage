import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'

function App({ Component, pageProps }: AppProps) {

	return (
		<>
			<script async defer data-website-id="70adc570-c6be-4c6c-a610-fa652cdbf201" src="https://analytics.chanakancloud.net/science.js"></script>
			<Navbar />
			<Component {...pageProps} />
		</>
	)
}

export default App
