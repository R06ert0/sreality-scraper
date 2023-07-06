// Packages
import {ReactNode, useEffect, useState} from "react";
// Components
import {EstatesService} from "../../lib/estates-service";
// Types
import {EstatesData} from "../../model/estates-data";

type Props = {
    children?: ReactNode;
}
export default function EstateProvider({children}: Props) {
    const [estates, setEstates] = useState<EstatesData[]>([]);
    const [page, setPage] = useState<number>(0);
    const estatesService = new EstatesService();

    useEffect(() => {
        estatesService.loadEstates(page).then(setEstates)
    }, [page]);

    function prevPage() {
        setPage(prev => {
            if (prev <= 0) {
                return 0;
            }
            return prev - 1;
        })
    }

    function nextPage() {
        setPage(prev => {
            return prev + 1;
        })
    }

    return <div style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap"
    }}>
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <button onClick={prevPage}>Prev page</button>
            <button onClick={nextPage}>Next page</button>
        </div>
        {children}
        {
            estates.map(estate => {
                return <div key={estate.id} style={{
                    border: "1px solid black"
                }}>
                    <h2>{estate.id + " - " + estate.title}</h2>
                    <img src={estate.img} alt={estate.title}/>
                </div>
            })
        }
    </div>;
};