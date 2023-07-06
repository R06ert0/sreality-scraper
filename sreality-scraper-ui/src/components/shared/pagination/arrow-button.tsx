// Packages
import {MouseEventHandler} from "react";

type Props = {
    iconSrc: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    flipped?: boolean;
}
export default function ArrowButton({iconSrc, onClick, flipped}: Props) {
    return <button style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        height: 40,
        width: 40,
        borderRadius: 20,
        cursor: "pointer",
        transform: flipped ? "rotate(180deg)" : "",
        backgroundColor: "transparent"
    }} onClick={onClick}>
        <img width={24} height={24} src={iconSrc} alt={"arrow icon"}/>
    </button>;
}
;