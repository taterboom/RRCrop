import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { MaterialSymbolsArrowOutwardRounded, PhTwitterLogoBold } from "../components/icons"

const App = dynamic(() => import("../components/App"), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
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
      </Head>

      <main>
        <App></App>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 pb-1 text-xs flex items-center justify-center text-white/30">
        <a
          href="mailto:xuebagod@gmail.com"
          className="flex items-center h-4 border-b-[1px] border-white/20"
        >
          send feedback <MaterialSymbolsArrowOutwardRounded style={{ fontSize: 8 }} />
        </a>
        <a
          href="https://twitter.com/didan64037534"
          className="h-4 border-b-[1px] border-white/20 ml-3 pt-0.5"
        >
          <PhTwitterLogoBold />
        </a>
      </footer>
    </div>
  )
}

export default Home
