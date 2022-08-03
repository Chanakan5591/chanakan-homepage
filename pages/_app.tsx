import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAckee from 'use-ackee'

function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useAckee(router.asPath, {
		server: 'https://analytics.chanakancloud.net',
		domainId: 'f6707833-45c2-477d-a4db-cd1f39d21733',
	}, {
		detailed: true
	})


	return (
		<>
			<script async defer data-website-id="c9223e45-ab29-403c-8e8e-4044633a31a8" src="https://analytics.chanakancloud.net/umami.js"></script>
			<Navbar />
			<Component {...pageProps} />
		</>
	)
}

export default App
