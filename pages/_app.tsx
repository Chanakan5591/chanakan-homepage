import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<script async defer data-website-id="04ad9739-87ae-457b-8c32-3407881cfcd1" src="https://analytics.chanakancloud.net/brew.js"></script>
			<Navbar />
			<Component {...pageProps} />
		</>
	)
}

export default App
