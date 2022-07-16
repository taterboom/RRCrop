// 组件
// Upload
// Stage
// Cropper
// ControlBar
// Preview

import { RecoilRoot } from "recoil"
import ControlBar from "./ControlBar"
import Stage from "./Stage"

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

export default App
