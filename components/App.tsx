import { RecoilRoot } from "recoil"
import ControlBar from "./ControlBar"
import Stage from "./Stage"

const Header = () => {
  return (
    <div className="max-w-[768px] mx-auto font-bold text-lg px-4 py-3">
      <img className="inline" src="/logo.svg" alt="" width="30" />
      <img className="inline ml-2" src="/title.png" alt="" width="108" />
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

export default App
