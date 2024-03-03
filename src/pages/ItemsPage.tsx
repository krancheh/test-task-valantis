import { useEffect, useMemo, useState } from "react"
import ItemList from "../components/ItemList/ItemList"
import useFetchItems from "../hooks/useFetchItems"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import $api from "../api"
import { FetchParams, ResponseData } from "../types"

const ItemsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const [offset, setOffset] = useState(Number(searchParams.get("offset")) || 0);
    const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 50);

    const fetchParams: FetchParams = useMemo(() => ({ offset, limit }), [offset, limit])
    const [items, isSuccess] = useFetchItems({ fetchParams });


    useEffect(() => {
        const newSearchParams: URLSearchParamsInit = {
            offset: offset.toString(),
            limit: limit.toString(),
        }

        setSearchParams(newSearchParams)
        $api.post<ResponseData<string[]>>("/", { action: "get_fields", params: { field: "brand" } })
            .then(response => {
                const fields = new Set(response.data.result);
                console.log(Array.from(fields));

            }
            )
    }, [offset, limit])

    return (
        <div>
            <h1>Каталог товаров</h1>
            {!isSuccess ? <h2>Загрузка..</h2> : <ItemList items={items} />}
        </div>
    )
}

export default ItemsPage