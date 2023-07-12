import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>
        <iframe
          src="https://chatfast.io/chat/bb136b44-fee5-4cce-acda-91af014d529b"
          width="450px"
          height="600px"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
