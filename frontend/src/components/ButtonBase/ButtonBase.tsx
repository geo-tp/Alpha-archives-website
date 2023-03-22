import clsx from "clsx";

type ButtonBaseProps = {
    label: string,
    isLoading: boolean,
    color: string
}

export const ButtonBase = (props : ButtonBaseProps) => {
    return (
        <button className={clsx("button-base", `button-base--${props.color}`)} disabled={props.isLoading}>
            {props.label}
        </button>
    )
}