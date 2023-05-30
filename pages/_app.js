import { Poppins } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "@/styles/globals.css";

const poppins = Poppins({
  weight: ["500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-NP9L1106X4`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NP9L1106X4');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
