import { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import { Rect } from "../../types/graph"
import { CarbonCloseOutline } from "../icons"

type PopupProps = {
  children?: React.ReactNode
  show: boolean
  place: {
    from: Rect
    to: Rect
  }
  tips?: string
  onClose: () => void
}

const Popup = (props: PopupProps) => {
  const [visible, setVisible] = useState(false)
  const [styles, api] = useSpring(() => ({
    number: 0,
    config: {
      duration: 200,
    },
  }))
  const [secondStyles, secondApi] = useSpring(() => ({
    opacity: 0,
    config: {
      duration: 150,
    },
  }))
  useEffect(() => {
    if (props.show) {
      setVisible(true)
    }

    const run = async () => {
      if (props.show) {
        await Promise.all(
          api.start({
            number: 1,
          })
        )
        await Promise.all(secondApi.start({ opacity: 1 }))
      } else {
        await Promise.all(
          secondApi.start({
            opacity: 0,
            config: {
              duration: 100,
            },
          })
        )
        await Promise.all(
          api.start({
            number: 0,
          })
        )
        setVisible(false)
      }
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])
  if (!visible) return null
  return (
    <div className="fixed inset-0 z-50">
      <animated.div
        className="fixed inset-0 bg-black/30 backdrop-blur-2xl"
        style={{
          opacity: styles.number,
        }}
        onClick={() => {
          props.onClose()
        }}
      ></animated.div>
      <animated.div
        className="fixed"
        style={{
          left: styles.number.to(
            (n) => props.place.from.x + (props.place.to.x - props.place.from.x) * n
          ),
          top: styles.number.to(
            (n) => props.place.from.y + (props.place.to.y - props.place.from.y) * n
          ),
          width: styles.number.to(
            (n) => props.place.from.width + (props.place.to.width - props.place.from.width) * n
          ),
          height: styles.number.to(
            (n) => props.place.from.height + (props.place.to.height - props.place.from.height) * n
          ),
        }}
      >
        <animated.div
          className="absolute right-0 -top-2 -translate-y-full text-titanium-yellow text-2xl"
          style={secondStyles}
          onClick={() => props.onClose()}
        >
          <CarbonCloseOutline />
        </animated.div>
        {props.children}
        <animated.div className="mt-3 p-4 text-center text-titanium-yellow" style={secondStyles}>
          {props.tips}
        </animated.div>
      </animated.div>
    </div>
  )
}

export default Popup
