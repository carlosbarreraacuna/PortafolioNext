"use client"

import { TypeAnimation } from "react-type-animation"

const AnimationText = () => {
  return (
    <TypeAnimation
      sequence={[
        "Carlos Barrera",
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: "2em", display: "inline-block" }}
      repeat={Number.POSITIVE_INFINITY}
      className=""
    />
  )
}

export default AnimationText

