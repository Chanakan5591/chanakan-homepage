import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAckee from 'use-ackee'

function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		useAckee(router.asPath, {
			server: 'https://analytics.chanakancloud.net',
			domainId: 'f6707833-45c2-477d-a4db-cd1f39d21733',
		}, {
			detailed: true
		})

	}, [router.asPath])

	return (
		<>
			<Navbar />
			<Component {...pageProps} />
		</>
	)
}

export default App
