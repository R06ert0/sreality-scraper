// Packages
import {useEffect, useState} from "react";
// Components
import PaginationButton from "./pagination-button";
import ArrowButton from "./arrow-button";

type Props = {
    pageIndex: number;
    totalPages: number;
    onPageIndexChange: Function;
}
export default function Pagination({pageIndex, totalPages, onPageIndexChange}: Props) {
    const [paginationWidth, setPaginationWidth] = useState<number>(0);
    const resizeObserver = new ResizeObserver((entries) => {
        const debounceValueInPx = 5;
        if (Math.abs(paginationWidth - entries[0].contentRect.width) > debounceValueInPx) {
            setPaginationWidth(entries[0].contentRect.width);
        }
    });

    useEffect(() => {
        resizeObserver.observe(document.body);
        return () => {
            resizeObserver.unobserve(document.body);
        };
    }, []);

    function getButtonNumbers() {
        if (!paginationWidth) {
            return [];
        }
        const numberOfButtons = getNumberOfButtons();
        return Array.from({length: numberOfButtons}, (_, i) => i + getStartNumber(numberOfButtons));
    }

    function getStartNumber(numberOfButtons: number) {
        const pageNumber = pageIndex + 1;
        if (pageNumber <= Math.floor(numberOfButtons / 2)) {
            return 1;
        }
        if (pageNumber >= Math.ceil(totalPages - (numberOfButtons / 2))) {
            return totalPages - (numberOfButtons - 1);
        }
        return pageNumber - Math.floor(numberOfButtons / 2);
    }

    function getNumberOfButtons() {
        const spaceForOneButton = 80;
        const isWidest = paginationWidth / spaceForOneButton >= 15;
        const isWide = paginationWidth / spaceForOneButton >= 10;
        const isNarrow = paginationWidth / spaceForOneButton >= 5;
        return isWidest ? 15 : isWide ? 10 : isNarrow ? 5 : 3;
    }

    function prevPage() {
        let newPageIndex;
        if (pageIndex <= 0) {
            newPageIndex = 0;
        } else {
            newPageIndex = pageIndex - 1;
        }
        onPageIndexChange(newPageIndex);
    }

    function nextPage() {
        const lastPageIndex = totalPages - 1;
        let newPageIndex;
        if (pageIndex >= lastPageIndex) {
            newPageIndex = lastPageIndex;
        } else {
            newPageIndex = pageIndex + 1;
        }
        onPageIndexChange(newPageIndex);
    }

    function firstPage() {
        onPageIndexChange(0);
    }

    function lastPage() {
        onPageIndexChange(totalPages - 1);
    }

    return <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    }}>
        <ArrowButton iconSrc={"/assets/images/double-arrow.svg"} onClick={firstPage}/>
        <ArrowButton iconSrc={"/assets/images/arrow.svg"} onClick={prevPage}/>
        {
            getButtonNumbers().map(btnNumber => <PaginationButton key={btnNumber}
                                                                  label={String(btnNumber)}
                                                                  onClick={() => onPageIndexChange(btnNumber - 1)}
                                                                  selected={btnNumber === pageIndex + 1}/>)
        }
        <ArrowButton iconSrc={"/assets/images/arrow.svg"} onClick={nextPage} flipped/>
        <ArrowButton iconSrc={"/assets/images/double-arrow.svg"} onClick={lastPage} flipped/>
    </div>;
}
;