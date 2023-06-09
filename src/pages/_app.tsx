import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '@/components/molecules/navbar';
import "./app.css";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/logo.png" type="image/png" />
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="bg-gray-900 h-[100vh] flex flex-col items-center text-gray-50">
      <div className="fixed top-0 left-0 right-0 border-b">
        <Navbar />
      </div>
      <Component {...pageProps} />
      <div className="fixed bottom-10 right-10 w-20 rounded-full overflow-hidden border-4 border-[#0090C1]">
        <a href="https://github.com/allenabraham777/nerd-fire-coins" target="_blank" rel="noopener noreferrer">
          <img src="https://github.com/github.png" />
        </a>
      </div>
    </div>
  </>;
}
