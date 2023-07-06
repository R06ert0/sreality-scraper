// Components
import EstateCard from "./estate-card";
// Types
import {EstateData} from "../../model/estate-data";

type Props = {
    estates: EstateData[];
}
export default function EstateList({estates}: Props) {

    return <div style={{
        display: "flex",
        gap: 48,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    }}>
        {
            estates.map(estate => {
                return <EstateCard key={estate.id} title={estate.title} img={estate.img}/>
            })
        }
    </div>;
}
;