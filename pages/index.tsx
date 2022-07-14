import type { NextPage } from "next"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import ControlBar from "../components/ControlBar"
import Handle from "../components/Handle"
import Stage from "../components/Stage"
import TouchPad from "../components/TouchPad"

// 组件
// Upload
// Stage
// Cropper
// ControlBar
// Preview

// 状态
// img {w, h, nw, nh}
// cropper rect{ x, y, w, h } radius

const Header = () => {
  return (
    <div className="max-w-[768px] mx-auto font-bold text-lg p-2">
      <span className="text-cadmium-orange">RR</span>
      <span className="text-titanium-yellow ">Crop</span>
    </div>
  )
}

const App = () => {
  return (
    <RecoilRoot>
      <Header></Header>
      <Stage></Stage>
      {/* <TouchPad></TouchPad> */}
      {/* <Handle></Handle> */}
      <ControlBar></ControlBar>
    </RecoilRoot>
  )
}

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
