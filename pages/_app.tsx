import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'

function App({ Component, pageProps }: AppProps) {

	return (
		<>
			<script async defer data-website-id="c9223e45-ab29-403c-8e8e-4044633a31a8" src="https://api.chanakancloud.net/umami.js"></script>
			<Navbar />
			<Component {...pageProps} />
		</>
	)
}

export default App
