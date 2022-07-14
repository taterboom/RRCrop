import clsx from "classnames"

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "inline-block text-base p-2 border border-midnight-blue/30 rounded-lg bg-air-blue/60 hover:bg-air-blue transition",
        props.className
      )}
    >
      {props.children}
    </button>
  )
}

export default Button
