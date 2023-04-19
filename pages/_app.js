import { Poppins } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'

const poppins = Poppins({
  weight: ['500', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-NP9L1106X4" />
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NP9L1106X4', {
            page_path: window.location.pathname,
            });
            `,
      }}
    />
    <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
    <Component {...pageProps} />
  </>
}
