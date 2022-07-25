import { SVGProps } from "react"

const DIR_TO_ANGLE = {
  down: 0,
  up: 180,
  left: 90,
  right: -90,
}

export function MaterialSymbolsArrow(
  props: SVGProps<SVGSVGElement> & { dir?: "down" | "up" | "left" | "right" }
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      style={{
        ...props.style,
        transform: `rotate(${DIR_TO_ANGLE[props.dir || "left"]}deg)`,
      }}
    >
      <path
        fill="currentColor"
        d="m11.3 14.3l-2.6-2.6q-.475-.475-.212-1.087Q8.75 10 9.425 10h5.15q.675 0 .937.613q.263.612-.212 1.087l-2.6 2.6q-.15.15-.325.225q-.175.075-.375.075t-.375-.075q-.175-.075-.325-.225Z"
      ></path>
    </svg>
  )
}

export function AntDesignFullscreenOutlined(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="m290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6l43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6L423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
      ></path>
    </svg>
  )
}

export function IconParkPreviewCloseOne(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30"></path>
        <path d="M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705"></path>
        <path d="M42 42L6 6"></path>
      </g>
    </svg>
  )
}

export function IconParkOutlinePreviewOpen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
        <path d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"></path>
        <path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"></path>
      </g>
    </svg>
  )
}

export function UilExport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.71 7.71L11 5.41V15a1 1 0 0 0 2 0V5.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42ZM21 14a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1Z"
      ></path>
    </svg>
  )
}

export function IconParkOutlineClear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
        <path strokeLinecap="round" d="M20 5.914h8v8h15v8H5v-8h15v-8Z" clipRule="evenodd"></path>
        <path d="M8 40h32V22H8v18Z"></path>
        <path strokeLinecap="round" d="M16 39.898v-5.984m8 5.984v-6m8 6v-5.984M12 40h24"></path>
      </g>
    </svg>
  )
}

export function CarbonCloseOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"
      ></path>
      <path
        fill="currentColor"
        d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
      ></path>
    </svg>
  )
}

export function IconParkDownPicture(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none">
        <path
          fill="currentColor"
          d="M44 24C44 22.8954 43.1046 22 42 22C40.8954 22 40 22.8954 40 24H44ZM24 8C25.1046 8 26 7.10457 26 6C26 4.89543 25.1046 4 24 4V8ZM39 40H9V44H39V40ZM8 39V9H4V39H8ZM40 24V39H44V24H40ZM9 8H24V4H9V8ZM9 40C8.44772 40 8 39.5523 8 39H4C4 41.7614 6.23857 44 9 44V40ZM39 44C41.7614 44 44 41.7614 44 39H40C40 39.5523 39.5523 40 39 40V44ZM8 9C8 8.44772 8.44771 8 9 8V4C6.23858 4 4 6.23857 4 9H8Z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M6 35L16.6931 25.198C17.4389 24.5143 18.5779 24.4953 19.3461 25.1538L32 36"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M28 31L32.7735 26.2265C33.4772 25.5228 34.5914 25.4436 35.3877 26.0408L42 31"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M32 13L37 18L42 13"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M37 6L37 18"
        ></path>
      </g>
    </svg>
  )
}

export function PhTwitterLogoBold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M251.1 67.4A12 12 0 0 0 240 60h-28.2A52 52 0 0 0 116 88v.8c-37.3-11.5-67.2-41-67.5-41.3a12 12 0 0 0-20.3 6.4c-9 49.6 6 83 20.1 102.2a112.3 112.3 0 0 0 22 22.5C55.9 193 36 200.7 35.8 200.8a11.7 11.7 0 0 0-7.2 7.5a12.3 12.3 0 0 0 1.4 10.4c1.9 2.9 13.4 17.3 50 17.3c72.1 0 132.5-55.1 139.3-126.4l29.2-29.1a12.2 12.2 0 0 0 2.6-13.1Zm-51.8 28.4a11.3 11.3 0 0 0-3.5 7.7C191.9 164.3 141 212 80 212a89.4 89.4 0 0 1-12.5-.8c10.4-6.7 22.2-16.1 30.5-28.5a12.1 12.1 0 0 0 1.6-9.8a11.8 11.8 0 0 0-6.2-7.6c-2-1.1-45.6-24.2-43.9-85.4c17.2 13.1 45 30.7 76.5 35.9a12 12 0 0 0 14-11.8V88a28.3 28.3 0 0 1 28.4-28a28 28 0 0 1 25.3 16.8a11.9 11.9 0 0 0 11 7.2h6.3Z"
      ></path>
    </svg>
  )
}

export function MaterialSymbolsArrowOutwardRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m16 8.4l-8.875 8.9q-.3.3-.713.3q-.412 0-.712-.3t-.3-.713q0-.412.3-.712L14.6 7H7q-.425 0-.713-.287Q6 6.425 6 6t.287-.713Q6.575 5 7 5h10q.425 0 .712.287Q18 5.575 18 6v10q0 .425-.288.712Q17.425 17 17 17t-.712-.288Q16 16.425 16 16Z"
      ></path>
    </svg>
  )
}
