import { useEffect, useState } from "react";
import { FilterParams } from "../types";
import { useAppSelector } from "../store";
import { selectCachedIds } from "../store/cacheSlice";


interface IProps {
    filter: FilterParams;
    offset: number;
    limit: number;
}

const useGetTotalPages = (props: IProps) => {
    const { filter, offset, limit } = props;

    const [pagesAmount, setPagesAmount] = useState(1);
    const cachedIdsByFilter = useAppSelector(state => selectCachedIds(state, filter));


    const setNewPagesAmount = (itemsAmount: number, limit: number) => {
        const pages = Math.ceil(itemsAmount / limit);
        setPagesAmount(pages);
    }


    useEffect(() => {
        if (filter && cachedIdsByFilter) {
            setNewPagesAmount(cachedIdsByFilter.length, limit);
            return;
        }

        if (!filter) {
            setPagesAmount(offset + 2);
        }
    }, [cachedIdsByFilter])

    return { pagesAmount };
}

export default useGetTotalPages;