import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"

const App = dynamic(() => import("../components/App"), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RRCrop</title>
        <meta name="description" content="rounded rect crop image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App></App>
      </main>

      <footer></footer>
    </div>
  )
}

export default Home
