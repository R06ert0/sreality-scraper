// Packages
import {MouseEventHandler} from "react";

type Props = {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    selected?: boolean;
}
export default function PaginationButton({label, onClick, selected}: Props) {
    return <button style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        border: "none",
        height: 40,
        width: 40,
        borderRadius: 20,
        color: selected ? "var(--bg-white)" : "var(--font-color)",
        backgroundColor: selected ? "var(--bg-dark-red)" : "transparent",
        cursor: "pointer"
    }} onClick={onClick}>{label}</button>;
}
;