import '@/styles/globals.css'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['500', '700'],
  style: ['normal'],
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
    <Component {...pageProps} />
  </>
}
