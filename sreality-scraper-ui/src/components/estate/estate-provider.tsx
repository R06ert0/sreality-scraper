// Packages
import {useEffect, useState} from "react";
// Components
import {EstatesService} from "../../lib/estates-service";
import Pagination from "../shared/pagination/pagination";
import EstateList from "./estate-list";
// Types
import {EstateData} from "../../model/estate-data";

export default function EstateProvider() {
    const [estates, setEstates] = useState<EstateData[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 20;

    useEffect(() => {
        const estatesService = new EstatesService();
        estatesService.loadEstates(pageIndex, pageSize).then(estatesResponse => {
            setEstates(estatesResponse.estates);
            setTotalPages(Math.ceil(estatesResponse.total / pageSize));
        });
    }, [pageIndex]);

    function handlePageIndexChange(pageIndex: number) {
        setPageIndex(pageIndex);
    }

    return <>
        <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageIndexChange={handlePageIndexChange}/>
        <EstateList estates={estates}/>
    </>;
};