import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"

const App = dynamic(() => import("../components/App"), { ssr: false })

const Home: NextPage = () => {
  return (
    <div className="fixed">
      <Head>
        <title>Rounded Rectangle Image Cropping - RRCrop</title>
        <meta
          name="description"
          content="crop image in rounded rectangle, add rounded corners to image."
        />
        <meta
          name="keywords"
          content="crop image, crop picture, crop image in rounded rectangle, add rounded corners"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="baidu-site-verification" content="code-pBCKED8aDh" />
      </Head>

      <main>
        <App></App>
      </main>

    </div>
  )
}

export default Home
