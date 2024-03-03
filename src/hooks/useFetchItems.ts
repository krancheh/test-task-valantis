import { RequestBody, ResponseData } from './../types.d';
import { useEffect, useRef, useState } from 'react'
import { ItemType, FetchParams } from '../types';
import $api from '../api';
import getUniqueItems from '../utils/getUniqueItems';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCachedItems, setCachedItems } from '../store/cacheSlice';

interface IProps {
    fetchParams: FetchParams;
}

const useFetchItems = (props: IProps): [ItemType[], boolean, boolean] => {
    const { fetchParams } = props;

    const items = useAppSelector(state => selectCachedItems(state, fetchParams));
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

                const getIdsBody: RequestBody<FetchParams> = {
                    action: "get_ids",
                    params: fetchParams,
                }

                const idsResponse = await $api.post<ResponseData<string[]>>("/", getIdsBody);
                const ids = idsResponse.data.result;

                const getItemsBody: RequestBody<{ ids: string[] }> = {
                    action: "get_items",
                    params: { ids },
                }

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