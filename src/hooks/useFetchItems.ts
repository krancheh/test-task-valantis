import { FilterParams, RequestBody, ResponseData } from './../types.d';
import { useEffect, useRef, useState } from 'react'
import { ItemType, FetchParams } from '../types';
import $api from '../api';
import getUniqueItems from '../utils/getUniqueItems';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCachedIds, selectCachedItems, setCachedIds, setCachedItems } from '../store/cacheSlice';


interface IProps {
    fetchParams: FetchParams;
}

type UseFetchItems = [ItemType[], boolean, boolean];


const useFetchItems = (props: IProps): UseFetchItems => {
    const { fetchParams } = props;

    const items = useAppSelector(state => selectCachedItems(state, fetchParams));
    const cachedIdsByFilter = useAppSelector(state => selectCachedIds(state, fetchParams.filter));

    const [isFetching, setIsFetching] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const refetchTimeout = useRef<NodeJS.Timeout>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        let isMounted = true;
        setIsFetching(true);

        const fetchItems = async () => {
            try {
                // если товары по таким параметрам есть в кэше, то новый запрос не делаем
                if (items && items.length > 0) {
                    setIsFetching(false);
                    setIsSuccess(true);
                    return;
                }

                const { filter, offset, limit } = fetchParams;

                // Если в параметрах есть filter, то action будет filter
                const getIdsBody: RequestBody<FetchParams> | RequestBody<FilterParams> = filter
                    ? { action: "filter", params: filter }
                    : { action: "get_ids", params: { offset, limit } };

                let ids: string[];

                // Запрос айдишников 
                if (filter && cachedIdsByFilter && cachedIdsByFilter.length > 0) {
                    ids = cachedIdsByFilter.slice(offset * limit, offset * limit + limit - 1);
                } else {
                    const idsResponse = await $api.post<ResponseData<string[]>>("/", getIdsBody);
                    dispatch(setCachedIds([filter, idsResponse.data.result]));
                    ids = filter ? idsResponse.data.result.slice(offset * limit, offset * limit + limit - 1) : idsResponse.data.result;
                }

                const getItemsBody: RequestBody<{ ids: string[] }> = {
                    action: "get_items",
                    params: { ids },
                }

                // Запрос товаров
                const itemsResponse = await $api.post<ResponseData<ItemType[]>>("/", getItemsBody);

                // Фильтрация повторяющихся id товаров
                const uniqueItems = getUniqueItems(itemsResponse.data.result);

                dispatch(setCachedItems([fetchParams, uniqueItems]));
                setIsSuccess(true);

            } catch (error: any) {
                setIsSuccess(false);

                // Если компонент существует, то делаем повторный запрос через 1 сек
                if (isMounted) {
                    refetchTimeout.current = setTimeout(() => fetchItems(), 1000);
                }
            } finally {
                setIsFetching(false);
            }
        }

        fetchItems();

        // unMount
        return () => {
            isMounted = false;
            clearTimeout(refetchTimeout.current);
        }
    }, [fetchParams]);

    return [items, isSuccess, isFetching];
}

export default useFetchItems