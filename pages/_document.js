import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='overflow-x-hidden'>
      <Head ><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
