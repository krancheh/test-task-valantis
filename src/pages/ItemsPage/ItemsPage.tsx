import { useEffect, useMemo, useState } from "react"
import ItemList from "../../components/ItemList/ItemList"
import useFetchItems from "../../hooks/useFetchItems"
import { useSearchParams } from "react-router-dom"
import { FetchParams, FilterParams } from "../../types"
import Pagination from "../../components/Pagination/Pagination"
import Filter from "../../components/Filter/Filter"
import useGetTotalPages from "../../hooks/useGetTotalPages"
import SearchBar from "../../components/SearchBar/SearchBar"
import styles from "./ItemsPage.module.scss";

export interface UpdateParams {
    offset?: string,
    limit?: string,
    filter?: string
}

const ItemsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(50);
    const [filter, setFilter] = useState<FilterParams>(null);

    const fetchParams: FetchParams = useMemo(() => ({ offset, limit, filter }), [offset, limit, filter])
    const { items, isSuccess, isFetching } = useFetchItems({ fetchParams });
    const { pagesAmount } = useGetTotalPages({ filter, offset, limit });


    useEffect(() => {
        setOffset(Number(searchParams.get("offset")) || 0);
        setLimit(Number(searchParams.get("limit")) || 50);
        setFilter(JSON.parse(searchParams.get("filter")));
    }, [searchParams])


    // Обновляем параметры адресной строки, чтобы сработал useEffect ^^^^
    const updateFetchParams = (params: UpdateParams) => {
        const newSearchParams = {
            ...Object.fromEntries(searchParams),
            ...params,
        };

        return setSearchParams(newSearchParams);
    }

    const setFilterHandler = (newFilter: FilterParams) => {
        if (!newFilter) {
            return updateFetchParams({ filter: null, offset: "0" });
        }

        return updateFetchParams({ filter: JSON.stringify(newFilter), offset: "0" });
    }


    return (
        <div>
            <h1>Каталог товаров</h1>
            {filter &&
                <p className={styles.filter}>
                    Текущий фильтр:
                    <span> {Object.keys(filter)[0]} - {Object.values(filter)[0]}</span>
                </p>
            }
            <SearchBar setFilter={setFilterHandler} />
            <div className={styles.content}>
                <Filter setFilter={setFilterHandler} />
                <div className={styles.items}>
                    {isFetching && <h4 className={styles.status}>Загрузка...</h4>}

                    {isSuccess && !isFetching && items?.length === 0 && <p className={styles.status}>Товары не найдены</p>}

                    {isSuccess && items?.length > 0 && <ItemList items={items} />}

                    <Pagination currentPage={offset} totalPages={pagesAmount} updateFetchParams={updateFetchParams} />
                </div>
            </div>
        </div>
    )
}

export default ItemsPage