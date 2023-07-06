//Packages
import {ReactNode} from "react";

type Props = {
    children: ReactNode
}
export default function PageLayout({children}: Props) {
    return <div id="page-layout">
        {children}
    </div>;
}
;