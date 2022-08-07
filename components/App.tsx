import { RecoilRoot } from "recoil"
import ControlBar from "./ControlBar"
import Stage from "./Stage"
import clsx from "classnames"
import { MaterialSymbolsArrowOutwardRounded, PhTwitterLogoBold } from "../components/icons"
import { getOrientation } from "../components/utils"
import initSentry from "./sentry"

initSentry()

const Header = () => {
  return (
    <div className="max-w-[768px] mx-auto font-bold text-lg px-4 py-3 md:text-center">
      <img className="inline" src="/logo.svg" alt="" width="30" />
      <img className="inline ml-2" src="/title.png" alt="" width="108" />
    </div>
  )
}

const Footer = () => {
  return <footer className={clsx("fixed text-xs flex justify-center text-white/30", getOrientation() === 'portrait' ? "bottom-0 left-0 right-0 pb-1 items-center" : "left-4 top-[476px] flex-col items-start")}>
    <a
      href="https://twitter.com/didan64037534"
      className={"flex items-center h-4 border-b-[1px] border-white/20 pt-0.5"}
    >
      <PhTwitterLogoBold />@didan
    </a>
    <a
      href="mailto:xuebagod@gmail.com"
      className={clsx("flex items-center h-4 border-b-[1px] border-white/20", getOrientation() === 'portrait' ? "ml-3" : "mt-0.5")}
    >
      send feedback <MaterialSymbolsArrowOutwardRounded style={{ fontSize: 8 }} />
    </a>
  </footer>
}

const App = () => {
  return (
    <RecoilRoot>
      <Header></Header>
      <Stage></Stage>
      {/* <TouchPad></TouchPad> */}
      {/* <Handle></Handle> */}
      <ControlBar></ControlBar>
      <Footer></Footer>
    </RecoilRoot>
  )
}

export default App
