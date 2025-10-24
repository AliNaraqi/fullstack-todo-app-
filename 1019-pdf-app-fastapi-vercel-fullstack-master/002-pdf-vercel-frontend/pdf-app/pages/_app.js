import '@/styles/globals.css'
import ErrorBoundary from '../components/error-boundary'

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
