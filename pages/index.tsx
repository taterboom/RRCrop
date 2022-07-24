import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"

const App = dynamic(() => import("../components/App"), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rounded Rectangle Image Cropping - RRCrop</title>
        <meta name="description" content="crop image with rounded corners" />
        <meta
          name="keywords"
          content="crop image, crop picture, crop image in rounded rectangle, add rounded corners"
        />
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
